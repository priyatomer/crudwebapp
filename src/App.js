import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Logout from './components/Logout';
import Error from './components/Error';

function App () {
	return (
		<div className='App'>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path='/signup' element={<Signup />} />
					<Route path='/signin' element={<Login />} />
					<Route path='/' element={<ProductList />} />
					<Route path='/add' element={<AddProduct />} />
					<Route path='/update/:id' element={<UpdateProduct />} />
					<Route path='/about' element={<About />} />
					<Route path='*' element={<Error />} />
					<Route path='/logout' element={<Logout />} onClick={() => alert('hello')} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
