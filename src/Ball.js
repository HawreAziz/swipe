import React from 'react';
import { View, Animated } from 'react-native';


class Ball extends React.Component {
  UNSAFE_componentWillMount(){
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: {x:300, y:600},
      useNativeDriver: false,
    }).start();
  }

  render(){
    return (
      <Animated.View style={this.position.getLayout()} >
        <View style={styles.container} />
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#000'
  }
}

export default Ball;
