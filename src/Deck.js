import React from 'react';
import { View, PanResponder, Animated, Dimensions } from 'react-native';



const SCREEN_WIDTH = Dimensions.get('window').width;
const ROTATE_THRESHOLD = 0.30 * Dimensions.get('window').width;
const SWIPE_DURATION = 200;

class Deck extends React.Component {
  static defaultProps = {
    onSwipeRight: () => {console.log('right')},
    onSwipeLeft: () => {console.log('left')}
  }

  constructor(props){
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = new PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (event, gesture) => {
        if(gesture.dx > ROTATE_THRESHOLD){
          this.onForceSwipe('right');
        }else if(gesture.dx < -ROTATE_THRESHOLD){
          this.onForceSwipe('left');
        }else{
          this.resetCard();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState({index: 0});
    }
  }

  onForceSwipe(direction){
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0},
      duration: SWIPE_DURATION,
      useNativeDriver: false
    }).start(() => this.onSwipeComplete(direction));
  }


  onSwipeComplete(direction){
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];
    this.setState({ index : this.state.index + 1});
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({x: 0, y: 0});
  }

  renderCards(){
    if(this.state.index === this.props.data.length){
      return this.props.noMoreCards();
    }
    return this.props.data.map((item, index) => {
      if(index < this.state.index){
        return null;
      }
      if (index === this.state.index){
        return (
          <Animated.View
            key={item.id}
            {...this.state.panResponder.panHandlers}
            style={[this.getCardStyle(), styles.cardStyle]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          style={[styles.cardStyle, {top: 10 * (index - this.state.index), zIndex: 5}]}
          key={item.id}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }

  resetCard(){
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start()
  }

  getCardStyle(){
    const {position} = this.state;
    const rotate = position.x.interpolate({
          inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
          outputRange: ['-45deg', '0deg', '45deg']
        });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  render(){
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  }
}

export default Deck;
