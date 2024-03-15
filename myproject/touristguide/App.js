import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import { yelpAPIKey } from './YelpAPI';
import { FontAwesome } from '@expo/vector-icons'
import { useFonts } from 'react-native-google-fonts';

const { width } = Dimensions.get('window');

const headerSize = 25;
const textSize = 20;

const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://api.yelp.com/v3/businesses/search?location=canada',
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
  blue: '#cad3fc',
  gray: '#b3b2af',
  black: '#000000',
  white: '#ffffff',
  purple: '#340163',
  yellow: '#fac825'
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

  const renderStars = (rating) => {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  
    return stars.map(star => {
      const isHalfStar = rating - Math.floor(rating) >= 0.5 && rating - Math.floor(rating) < 1;
  
      if (star <= Math.floor(rating)) {
        return (
          <Text
            key={star}
            style={[
              styles.text,
              styles.filledStar,
            ]}
          >
            ★
          </Text>
        );
      } else if (star === Math.ceil(rating) && isHalfStar) {
        return (
          <Text
            key={star}
            style={[
              styles.text,
              styles.halfStar,
            ]}
          >
            ☆
          </Text>
        );
      } else {
        return (
          <Text
            key={star}
            style={[
              styles.text,
              styles.emptyStar,
            ]}
          >
            ★
          </Text>
        );
      }
    });
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: card.image_url }} style={styles.cardImage} />
      <View style={styles.textContainer}>
        <Text style={[styles.heading]}>
          {card.name}
        </Text>
        <View style={styles.starsContainer}>
          {renderStars(card.rating)}
        </View>
      </View>
    </View>
  );
};

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = useState([]);

  const swiperRef = React.useRef();

  React.useEffect(() => {
    fetchData().then((businesses) => {
      setData(businesses);
    });
  }, []);

  const handleNextButtonPress = () => {
    setIndex((index + 1) % data.length);
  };

  const prev = () => {
    setIndex((index - 1) % data.length);
  };

  const handlePreviousButtonPress = () => {
    setIndex((index - 1 + data.length) % data.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('./images/travel-guide.png')} style={styles.titleImage} />
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={data}
          cardIndex={index}
          renderCard={(card) => <Card card={card} index={index}/>}
          goBackToPreviousCardOnSwipeLeft = {true}
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
          <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()}>
            <Image
              source={require('./images/leftarrow.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => swiperRef.current.swipeRight()}>
          <Image
              source={require('./images/rightarrow.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>  
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  titleContainer: {
    alignItems: 'center',
    top: '6%',
    flex: 0.25
  },
  swiperContainer: {
    flex: 0.65,
  },
  bottomContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cardImage: {
    width: "50%",
    flex: 1,
    resizeMode: 'contain',
  },
  titleImage: {
    flex: 1,
    justifyContent: 'center',
    width: 100
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
    fontSize: textSize,
  },
  heading: {
    fontSize: headerSize,
    marginBottom: 10,
    fontFamily: 'Avenir-Heavy',
    color: colors.purple,
    marginLeft: "10%",
    marginRight: "10%",
    textAlign: 'center'
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
  bottomContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  filledStar: {
    color: colors.yellow
  },
  emptyStar: {
    color: colors.gray,
  },
  halfStar: {
    color: colors.yellow
  },
  starsContainer: {
    flexDirection: 'row',
  },
});