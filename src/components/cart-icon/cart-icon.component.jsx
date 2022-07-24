
import {useDispatch, useSelector} from 'react-redux';
import {selectCartCount, selectIsCartOpen} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { ReactComponent as ShopIcon } from '../../assets/shopping-bag.svg';



import './cart-icon.styles.scss';


const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  }

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShopIcon  className='shopping-icon'/>
      <span className='item-count'>{cartCount}</span>
    </div>
  )

}

export default CartIcon;