import { ADD_ADDRESS } from '../actions/address';
import Address from '../../models/address';

const initialState = {
    address: []
};

export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_ADDRESS:
        const newAddress = new Address(
          action.addressData.id,
          action.addressData.alias,
          action.addressData.type,
          action.addressData.landmark,
          action.addressData.location,
          action.addressData.city,
          action.addressData.country,
          action.addressData.zipcode,
          action.addressData.latitude,
          action.addressData.longitude,
        );
        return {
          ...state,
          address: state.address.concat(newAddress)
        };
    }
  
    return state;
};
