import './directory-item.styles.scss';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) => {

  const {title, imageUrl, route} = category;
  const navigate = useNavigate();

  const navigateHandler = () => navigate(route);

  return (
    <div className='directory-item-container' onClick={navigateHandler}>
      <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}></div>
      <div className='body'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );

  
}
  
export default DirectoryItem;