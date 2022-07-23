import { createContext,  useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

  if(existingCartItem){
    return cartItems.map(cartItem => cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem )
  }

  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
  if(productToRemove.quantity > 1){
    return cartItems.map(cartItem => cartItem.id === productToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem)

  }

  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);

}

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
}

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN ',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const cartReducer = (state, action) => {
  const {type, payload} = action;
  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled action type ${type} in cartReducer`)
  }

}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,

}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: ()=> {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,

})


export const CartProvider = ({children}) => {

  const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);


  const userCartReducer = (newCartItems) => {
    const finalCount = newCartItems.reduce((count, cartItem)=> count + cartItem.quantity, 0)
    const finalTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartCount: finalCount, cartTotal: finalTotal}))
    
  }


  const addItemToCart = (productToAdd) => {
    userCartReducer(addCartItem(cartItems, productToAdd))
  }

  const removeItemFromCart = (productToRemove) => {
    userCartReducer(removeCartItem(cartItems, productToRemove))
  }

  const clearItemFromCart = (productToClear) => {
    userCartReducer(clearCartItem(cartItems, productToClear))
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart,removeItemFromCart, clearItemFromCart, cartCount, cartTotal};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}