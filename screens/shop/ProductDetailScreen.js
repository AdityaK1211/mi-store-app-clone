import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Card, RadioButton, Paragraph, Title } from 'react-native-paper';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import CarouselCard from '../../components/UI/CarouselCard';
import DefaultText from '../../components/UI/DefaultText';
import * as cartActions from '../../store/actions/cart';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(selectedProduct.rating);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  // Filled Star. You can also give the path from local
  const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Card>
        <CarouselCard
            style='slide'
            items={[{
              carouselImage: selectedProduct.imageUrl1,
            }, {
              carouselImage: selectedProduct.imageUrl2,
            }, {
              carouselImage: selectedProduct.imageUrl3,
            }, {
              carouselImage: selectedProduct.imageUrl4,
            },]}
          />  
      </Card>
      <Card style={{ padding: 10 }}>
          <Card.Title style={styles.title} title={selectedProduct.title} />
          <Card.Content>
            <Paragraph>{selectedProduct.description}</Paragraph>
            <Title>
            <Text style={styles.price}>₹{selectedProduct.price} <Text style={{ color: Colors.secondaryTextColor, fontSize: 14, textDecorationLine: 'line-through'}}>₹{selectedProduct.oldPrice}</Text></Text>
            </Title>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text>Rating: {selectedProduct.rating}/5</Text>
              <CustomRatingBar />
            </View>
          </Card.Content>
          <Card.Actions style={{ paddingHorizontal: 20 }}>
            <Button 
              title="Buy Now" 
              color={Colors.primaryColor}
              onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
              }}
            />
          </Card.Actions>
      </Card>
      <Card style={{ padding: 10, marginTop: 10 }}>
        {/* {selectedProduct.overview.map(item => (
          <ListItem key={item}>{item}</ListItem>
        ))} */}
        <Card.Title title="Overview" />
        <Card.Content>
          <Paragraph>{selectedProduct.overview}</Paragraph>
        </Card.Content>
      </Card>
      <Card style={{ padding: 10, marginTop: 10 }}>
        <Card.Title title="Specs" />
        <Card.Content>
        </Card.Content>
      </Card>

    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: Colors.primaryColor,
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  customRatingBarStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginLeft: 5
  },
  starImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});

export default ProductDetailScreen;
