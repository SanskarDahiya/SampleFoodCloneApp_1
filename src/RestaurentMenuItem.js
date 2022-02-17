import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {getImageUrl, getResUrl} from './../apis';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RestaurentSingle = props => {
  const {
    data: {
      name,
      cloudinaryImageId,
      cuisines,
      avgRating,
      costForTwo,
      sla: {slaString} = {},
    } = {},
  } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('Clieckei');
      }}>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'flex-start',
          flexDirection: 'row',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 8,
        }}>
        <View
          style={{
            position: 'relative',
            paddingRight: 8,
          }}>
          <Image
            source={{uri: getResUrl(cloudinaryImageId)}}
            style={{width: 100, height: 100, borderRadius: 8}}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 8,
            marginVertical: 16,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: '#3e4152',
              fontSize: 20,
              fontWeight: '600',
            }}>
            {name}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              color: '#696b79',
              fontSize: 16,
              fontWeight: '500',
            }}>
            <Ionicons name={'star'} size={12} />
            <Text style={{paddingLeft: 6}}>{avgRating}</Text>
            <Text style={{paddingLeft: 8}}>|</Text>
            <Text style={{paddingLeft: 8}}>{slaString}</Text>
            <Text style={{paddingLeft: 8}}>|</Text>
            <Text style={{paddingLeft: 8}}>{costForTwo}</Text>
          </View>
          <Text
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: '#93959f',
              fontSize: 16,
            }}>
            {cuisines && cuisines.join(' ')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const RenderHeader = props => {
  const {header: {title, subtitle, imageId} = {}} = props;
  return (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'flex-start',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 8,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: getImageUrl(imageId)}}
          style={{width: 30, height: 30}}
        />
        <Text style={{color: '#3d4152', fontSize: 22, fontWeight: '800'}}>
          {title}
        </Text>
      </View>
      <Text
        style={{
          color: '#686b78',
          fontWeight: '400',
          marginTop: 2,
          fontSize: 18,
        }}>
        {subtitle}
      </Text>
    </View>
  );
};
const RestaurentMenuItem = props => {
  const {data: {header, restaurants} = {}} = props;
  return (
    <View style={{flex: 1}}>
      <RenderHeader header={header} />
      {restaurants.map((data, key) => (
        <RestaurentSingle key={key} data={data.info} />
      ))}
    </View>
  );
};

export default RestaurentMenuItem;
