import './button.styles.scss';
import ButtonSpinner from '../button-spinner/button-spinner.component';


export const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({buttonType, isLoading=false,  children,...otherProps}) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} disabled={isLoading}{...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </button>
  )

}

export default Button;