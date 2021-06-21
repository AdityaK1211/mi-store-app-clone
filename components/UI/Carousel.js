import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { Card } from 'react-native-paper';

const Slide = (props) => {
    const { carouselImage } = props;
  
    return (
      <View style={styles.slide}>
        <Card.Cover style={{ ...styles.slideText }} source={{ uri: carouselImage }}/>     
      </View>
    );
}

export const Carousel = (props) => {

  const { items, style } = props;
  const itemsPerInterval = props.itemsPerInterval === undefined
    ? 1
    : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  }

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset+1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  }

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={data => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items.map((item, index) => {
          switch (style) {
            case 'stats':
              return (
                <Stat
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              );
            default:
              return (
                <Slide
                  key={index}
                  carouselImage={item.carouselImage}
                />
              );
          }
        })}
      </ScrollView>
      <View style={styles.bullets}>
        {bullets}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: '#fbfbfb',      
      shadowColor: '#fcfcfc',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 5
      },
    },
    scrollView: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
    },
    bullets: {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingTop: 5,
    },
    bullet: {
      paddingHorizontal: 5,
      fontSize: 20,
    },
    slide: {
        flexBasis: '100%',
        flex: 1,
        maxWidth: '100%',        
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: 200,
    },
    slideText: {
        width: '100%',
    },
});

export default Carousel;