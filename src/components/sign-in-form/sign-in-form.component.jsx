import {useState} from 'react';
import {useDispatch} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component'

import { googleSignInStart,emailSignInStart } from '../../store/user/user.action';
import './sign-in-form.styles.scss';


const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password,} = formFields;


  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
   
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async( event) => {
    event.preventDefault();
  
    try{
      dispatch(emailSignInStart(email, password));
      resetFormFields();

    }catch(err){
      switch(err.code){
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(err)
    }

    }


  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})

  }
  
  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;