import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import { yelpAPIKey } from './YelpAPI';

const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://api.yelp.com/v3/businesses/search?location=toronto',
      config
    );
    const data = response.data.businesses;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const colors = {
  red: '#ec2379',
  blue: '#0070ff',
  gray: '#777777',
  black: '#000000',
  white: '#ffffff',
};

const config = {
  headers: {
    Authorization: `Bearer ${yelpAPIKey}`,
  },
};

const Card = ({ card, index }) => {
  if (!card) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: card.image_url }} style={styles.cardImage} />
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.heading]}>
          {card.name}
        </Text>
        <Text style={[styles.text, styles.rating]}>
          {card.rating} Stars
        </Text>
      </View>
    </View>
  );
};

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  const handleNextButtonPress = () => {
    setIndex((index + 1) % data.length);
  };

  const handlePreviousButtonPress = () => {
    setIndex((index - 1 + data.length) % data.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          cards={data}
          cardIndex={index}
          renderCard={(card) => <Card card={card} index={index}/>}
          onSwipedLeft={handleNextButtonPress}
          onSwipedRight={handlePreviousButtonPress}
          stackSize={4}
          stackScale={10}
          stackSeparation={0}
          disableTopSwipe
          disableBottomSwipe
          animateCardOpacity
          infinite
          backgroundColor={'transparent'}
        />
      </View>
      <View style={styles.bottomContainerButtons}>
        <View>
          <Button title="next" onPress={handleNextButtonPress} />
          <Button title="previous" onPress={handlePreviousButtonPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  swiperContainer: {
    flex: 0.65,
  },
  bottomContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: 'contain',
  },
  card: {
    flex: 0.55,
    borderRadius: 15,
    shadowRadius: 65,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Courier', // Add the fontFamily here
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    color: colors.gray,
  },
  price: {
    color: colors.blue,
    fontSize: 32,
    fontWeight: '500',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
});