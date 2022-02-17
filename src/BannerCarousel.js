import React from 'react';
import {View, Dimensions} from 'react-native';
import Carousel from 'react-native-banner-carousel';
const BannerWidth = Dimensions.get('window').width;
const BannerCarousel = props => {
  const {cards, fetchImage} = props;
  return (
    <View style={{paddingVertical: 22}}>
      <Carousel
        autoplay
        autoplayTimeout={2000}
        index={0}
        loop
        pageSize={BannerWidth}>
        {cards.map((data, key) => (
          <React.Fragment key={key}>
            {fetchImage(
              {
                data,
                styles: {
                  height: (BannerWidth * 320) / 624,
                  width: BannerWidth,
                },
              },
              key,
            )}
          </React.Fragment>
        ))}
      </Carousel>
    </View>
  );
};
export default BannerCarousel;
