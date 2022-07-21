import { Route, Routes } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Auth from './routes/auth/auth.component';


const Shop = () => {
  return (
    <h1>Shop Page</h1>
  )
}

const App = () => {

  return(
    <Routes>
      <Route path='/' element={ <Navigation />}>
        <Route index element={<Home />}/>
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Auth />} />
      </Route>

    </Routes>
  )
   
};
 
export default App;
