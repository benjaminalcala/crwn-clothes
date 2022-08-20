import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import {selectCurrentUser} from '../../store/user/user.selector';
import {selectIsCartOpen} from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';





const Navigation = () => {
  const currentUser  = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(signOutStart())
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>{
            currentUser ? (
              <span className='nav-link' onClick={signOutUser}>
                SIGN OUT
              </span>
            ): (
              <Link className='nav-link' to='/auth'>
            SIGN IN
          </Link>
            )
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet />
    </Fragment>
    
  )
  
}

export default Navigation;