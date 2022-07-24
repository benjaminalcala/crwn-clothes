import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectCartItems} from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';


const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => navigate('/checkout')

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>)}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;