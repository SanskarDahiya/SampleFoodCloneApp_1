import React from 'react';
import {ScrollView, Image} from 'react-native';
import sampleData from './../swiggyData2.json';
import {getCoursalUrl} from './../apis';
import BannerCarousel from './BannerCarousel';
import RestaurentMenuItem from './RestaurentMenuItem';

function HomeScreen() {
  return (
    <ScrollView style={{flex: 1}}>
      {sampleData.map(({gridWidget, bannerCarousel}, key) => {
        if (bannerCarousel) {
          return (
            <BannerCarousel
              key={key}
              cards={bannerCarousel}
              fetchImage={({data: {imageId} = {}, styles}, index) => (
                <Image
                  key={index}
                  source={{uri: getCoursalUrl(imageId)}}
                  style={styles}
                />
              )}
            />
          );
        }
        return <RestaurentMenuItem key={key} data={gridWidget} />;
      })}
    </ScrollView>
  );
}

export default HomeScreen;
