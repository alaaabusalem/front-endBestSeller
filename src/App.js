import { Route,Routes } from 'react-router-dom';
import Home from './components/Home'
import Category from './components/Category'

import Reading from './components/Reading'
import WishList from './components/WishList'
import Navbar from './components/Navbar'
import Footer from './components/Footer';


function App() {
  return (
    <>
    <div>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/reading' element={<Reading/>}></Route>
      <Route path="/category/:content" element={<Category />} />
      <Route path='/wishlist' element={<WishList/>}></Route>
    </Routes>
    <Footer />
    </div>
    </>
  );
}

export default App;
