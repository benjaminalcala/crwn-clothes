import {createSelector} from 'reselect';
import { CartState } from './cart.reducer';
import { RootState } from '../store';


const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart => {
  return cart.cartItems
}))

export const selectIsCartOpen = createSelector([selectCartReducer],(cart => {
  return cart.isCartOpen
}))

export const selectCartCount = createSelector([selectCartItems], (cartItems) => {
  return cartItems.reduce((count, cartItem)=> count + cartItem.quantity, 0)

})

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)


})