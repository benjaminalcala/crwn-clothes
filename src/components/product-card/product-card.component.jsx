import {useSelector, useDispatch} from 'react-redux';
import {addItemToCart} from '../../store/cart/cart.action'; 
import {selectCartItems} from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = ({product}) => {
  const {name, imageUrl, price} = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const add = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted' onClick={add}>Add to Cart</Button>

    </div>
  )

}

export default ProductCard;