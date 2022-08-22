import { createAction, ActionWithPayload, Action, withMatcher } from '../../utils/reducer/reducer.utils';
import {CART_ACTION_TYPES, CartItem} from './cart.types';
import { CategoryItem } from "../categories/categories.types";


const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

  if(existingCartItem){
    return cartItems.map(cartItem => cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem )
  }

  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
  if(productToRemove.quantity > 1){
    return cartItems.map(cartItem => cartItem.id === productToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem)

  }

  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);

}

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
  return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
})


export const addItemToCart = (cartItems:CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = (addCartItem(cartItems, productToAdd));
  return setCartItems(newCartItems);

}

export const removeItemFromCart = (cartItems:CartItem[], productToRemove:CartItem) => {
  const newCartItems = (removeCartItem(cartItems, productToRemove));
  return setCartItems(newCartItems);

}

export const clearItemFromCart = (cartItems:CartItem[], productToClear:CartItem) => {
  const newCartItems = (clearCartItem(cartItems, productToClear));
  return setCartItems(newCartItems);

}

export const setIsCartOpen = withMatcher((bool: boolean):SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
})