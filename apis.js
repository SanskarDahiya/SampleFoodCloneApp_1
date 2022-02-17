export const getImageUrl = id =>
  id &&
  'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/' +
    id;

export const getResUrl = id => {
  if (id)
    return (
      'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/' +
      id
    );
};

export const getCoursalUrl = imageId => {
  if (imageId) {
    return (
      'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_624,h_320/' +
      imageId
    );
  }
};

export const getDishUrl = id => {
  if (id) {
    return (
      'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/' +
      id
    );
  }
};
