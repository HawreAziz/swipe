import React from 'react';
import { View, Text, Button, Dimensions, SafeAreaView } from 'react-native';
import Deck from './src/Deck';
import { Card } from 'react-native-elements';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];


const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function App() {

  const renderCard = (item) => {
    return (
      <Card
        key={item.id}
        containerStyle={{height: SCREEN_HEIGHT - 10}}
      >
        <Card.Image source={{ uri: item.uri }} style={{ height: SCREEN_HEIGHT * 0.7}} />
        <Card.Title>{item.text}</Card.Title>
        <Text style={{ marginBottom: 70}}>Customize later</Text>
        <Button onPress={() => console.log('button pressed')}
          title='View now'
          icon={{ name: 'code'}}
          backgroundColor='#03A9F4'
        />
      </Card>
    );
  }

  const noMoreCards = () => {
    return (
      <Card
        containerStyle={{height: SCREEN_HEIGHT - 10}}
      >
        <Text style={{ marginBottom: 70}}>No more Card to render</Text>
        <Button onPress={() => console.log('button pressed')}
          title='Fetch more cards'
          icon={{ name: 'code'}}
          backgroundColor='#03A9F4'
        />
      </Card>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Deck data={DATA} renderCard={renderCard} noMoreCards={noMoreCards}/>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  }
}
