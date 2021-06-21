import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    const displayName = getState().auth.displayName;
    const phoneNumber = getState().auth.phoneNumber;
    console.log(displayName)

    try {
      const response = await fetch(
        'FIREBASE_URL/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].categoryIds,
            resData[key].title,
            resData[key].imageUrl1,
            resData[key].imageUrl2,
            resData[key].imageUrl3,
            resData[key].imageUrl4,
            resData[key].price,
            resData[key].oldPrice,
            resData[key].description,
            resData[key].rating,
            resData[key].overview
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `FIREBASE_URL/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (categoryIds, title, imageUrl1, imageUrl2, imageUrl3, imageUrl4, price, oldPrice, description, rating, overview) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    
    const response = await fetch(
      `FIREBASE_URL/products.json?auth=${token}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categoryIds,
          title,
          imageUrl1,
          imageUrl2,
          imageUrl3,
          imageUrl4,
          price,
          oldPrice,
          description,
          rating,
          overview,
          ownerId: userId,
        })
      }
    )
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        categoryIds,
        title,
        imageUrl1,
        imageUrl2,
        imageUrl3,
        imageUrl4,
        price,
        oldPrice,
        description,
        rating,
        overview,
        ownerId: userId,
      }
    });
  };
};

export const updateProduct = (id, categoryIds, title, imageUrl1, imageUrl2, imageUrl3, imageUrl4, description, rating, overview) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `FIREBASE_URL/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categoryIds,
          title,
          imageUrl1,
          imageUrl2,
          imageUrl3,
          imageUrl4,
          description,
          rating,
          overview
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        categoryIds,
        title,
        imageUrl1,
        imageUrl2,
        imageUrl3,
        imageUrl4,
        description,
        rating,
        overview
      }
    });
  };
};