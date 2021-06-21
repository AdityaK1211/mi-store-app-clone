import Address from '../../models/address';

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const SET_ORDERS = 'SET_ORDERS';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';

export const addAddress = (alias, type, landmark, location, city, country, zipcode, latitude, longitude)  => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      
      const response = await fetch(
        `FIREBASE_URL/address/${userId}.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            alias, 
            type, 
            landmark, 
            location, 
            city, 
            country, 
            zipcode, 
            latitude, 
            longitude
          })
        }
      );
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
  
      const resData = await response.json();
  
      dispatch({
        type: ADD_ADDRESS,
        addressData: {
            id: resData.name,
            alias, 
            type, 
            landmark, 
            location, 
            city, 
            country, 
            zipcode, 
            latitude, 
            longitude
        }
      });
    };
};
