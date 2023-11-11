import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Products from './components/products/Products';
import NewProducts from './components/newProducts/NewProducts';

import './App.css'

const App = () => {  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/new-products' element={<NewProducts/>}/>
      </Routes>  
    </BrowserRouter>
      
    </>
  )
}

export default App
