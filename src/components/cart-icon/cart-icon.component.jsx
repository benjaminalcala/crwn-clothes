import './cart-icon.styles.scss';
import { useContext } from 'react';
import { ReactComponent as ShopIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';


const CartIcon = () => {

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }

  const {isCartOpen, setIsCartOpen} = useContext(CartContext)
  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShopIcon  className='shopping-icon'/>
      <span className='item-count'>0</span>
    </div>
  )

}

export default CartIcon;