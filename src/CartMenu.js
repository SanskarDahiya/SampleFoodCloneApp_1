import React, {useState} from 'react';
import {Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
const image = require('./../images/base.png');
const BannerWidth = Dimensions.get('window').width;

const ApplyCoupen = () => {
  return <Image source={image} style={{width: BannerWidth}} />;
};

const CartMenu = props => {
  const {menu: items, data} = props;
  const {setCartData} = data || {};
  //   console.log(data.items[id]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 22,
        borderTopWidth: 1,
      }}>
      {items.map(({id, name, price, peiceCount = 1}, index) => {
        return (
          <View
            key={index}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: 210}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {JSON.stringify(name)}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {['-', peiceCount, '+'].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      borderColor: 'darkgrey',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (index === 0) {
                          data.itemCounts -= 1;
                          if (data.itemCounts <= 0) {
                            data.itemCounts = 0;
                          }
                          peiceCount -= 1;
                          if (peiceCount <= 0) {
                            delete data.items[id];
                          } else {
                            data.items[id].peiceCount = peiceCount;
                          }
                          setCartData(data);
                        } else if (index === 2) {
                          data.itemCounts += 1;
                          data.items[id].peiceCount = peiceCount + 1;
                          setCartData(data);
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: index == 0 ? 'grey' : 'green',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#3e4152',
                    marginRight: 4,
                    fontSize: 18,
                    fontWeight: '400',
                  }}>
                  {'  ₹ ' + (peiceCount * price) / 100}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
      <ApplyCoupen />
    </View>
  );
};
export default CartMenu;
