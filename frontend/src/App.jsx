import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Products from './components/products/Products'
import './App.css'

const App = () => {  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/api/products' element={<Products/>}/>
      </Routes>  
    </BrowserRouter>
      
    </>
  )
}

export default App
