import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {getDishUrl} from '../apis';
import sampleData from './../swiggyData1.json';
import {getCartReducer} from './ContextData';
const CartData = getCartReducer();
const SingleDish = props => {
  const {data: {id, name, price, imageId, description} = {}} = props;
  return (
    <CartData.Consumer>
      {_cartData => {
        const {setCartData, itemCounts, items} = _cartData;
        const ifAlreadyAdded = Boolean(items[id]);
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 6,
              paddingHorizontal: 12,
              paddingTop: 6,
              borderBottomWidth: 1,
              paddingBottom: 12,
              borderBottomColor: 'grey',
            }}>
            <View style={{flex: 2}}>
              <Text
                style={{
                  color: '#3e4152',
                  marginRight: 4,
                  fontSize: 18,
                  fontWeight: '800',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  color: '#3e4152',
                  marginRight: 4,
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                {'₹  ' + price / 100}
              </Text>
              {description && (
                <Text
                  style={{
                    color: 'rgba(40, 44, 63, 0.45)',
                    marginTop: 2,
                  }}>
                  {description.slice(0, 60)}
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {imageId && (
                <Image
                  source={{uri: getDishUrl(imageId)}}
                  style={{
                    height: 100,
                    width: 120,
                    borderRadius: 10,
                    margin: 12,
                  }}
                />
              )}
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  paddingHorizontal: 18,
                  paddingVertical: 6,
                  borderRadius: 8,
                  bottom: 0,
                }}
                onPress={() => {
                  if (ifAlreadyAdded) {
                    delete items[props.data.id];
                    setCartData({itemCounts: itemCounts - 1, items});
                  } else {
                    items[props.data.id] = props.data;
                    setCartData({itemCounts: itemCounts + 1, items});
                  }
                }}>
                <View
                  style={{
                    // shadowColor: 'rgb(0 0 0 / 8%)',
                    shadowOffset: {width: 20, height: 30},
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    elevation: 5,
                  }}>
                  <Text style={{color: '#60b246', fontSize: 18}}>
                    {ifAlreadyAdded ? 'Added' : 'Add'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </CartData.Consumer>
  );
};

const SingleSectionData = props => {
  const {data} = props;
  return (
    <View>
      {data
        .map(({card: {info} = {}}, index) => {
          return <SingleDish key={index} data={info} />;
        })
        .filter(Boolean)}
    </View>
  );
};

const RenderGroupCard = props => {
  const {
    viewStyle,
    style = {},
    data: {_id, title, categories, itemCards} = {},
  } = props;
  let Component;
  if (itemCards) {
    Component = <SingleSectionData data={itemCards} />;
  } else if (categories) {
    Component = categories.map((data, index) => (
      <RenderGroupCard key={index} data={data} style={{marginTop: 0}} />
    ));
  }
  return (
    <View style={viewStyle}>
      <Text
        style={{
          margin: 14,
          color: '#3e4152',
          fontWeight: '800',
          fontSize: 22,
          ...style,
        }}>
        {title}
      </Text>
      {Component}
    </View>
  );
};
const SingleRestaurentPage = props => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        {sampleData
          .map(({groupedCard}, index) => {
            if (groupedCard) {
              return groupedCard.map(({card: {card = {}} = {}}, index) => {
                return (
                  <RenderGroupCard
                    key={index}
                    data={card}
                    viewStyle={{
                      borderTopWidth: 16,
                      borderTopColor: '#f1f1f6',
                    }}
                  />
                );
              });
            }
          })
          .filter(Boolean)}
      </View>
    </ScrollView>
  );
};
export default SingleRestaurentPage;
