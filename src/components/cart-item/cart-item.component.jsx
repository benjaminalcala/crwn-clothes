import './cart-item.styles.scss';

const CartItem = ({cartItem}) => {
  const {quantity, name} = cartItem;
  return (
    <div className='cart-item-container'>
      <span>{quantity} X {name}</span>
    </div>
  )

}
export default CartItem;