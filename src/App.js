import { Route,Routes } from 'react-router-dom';
import Home from './components/Home'
import Category from './components/Category'

import Reading from './components/Reading'
import WishList from './components/WishList'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import About from './components/About';
import Search from './components/Search';


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
      <Route path='/About' element={<About/>}></Route>
      <Route path='/search/:searchTerm' element={<Search />} />
    </Routes>
    <Footer />
    </div>
    </>
  );
}

export default App;
