import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './component/MainPage';
import Navbar from './component/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MobileCrane from './component/MobileCrane';
import Footer from './component/Footer';
import Faranacrane from './component/Faranacrane';
import Crawlercrane from './component/Crawlercrane';
import AboutUs from './component/AboutUs';
import ContactUs from './component/ContactUs';
import FloatingButton from './component/FloatingButton';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        
        <Route exact path='/' element={<MainPage />} />
        <Route exact path='/mobilecrane' element={<MobileCrane/>} />
        <Route exact path='/faranacrane' element={<Faranacrane/>} />

        <Route exact path='/crawlercrane' element={<Crawlercrane/>} />
        <Route exact path='/aboutus' element={<AboutUs/>} />
        <Route exact path='/contactus' element={<ContactUs/>} />




        
      </Routes>
      <FloatingButton />

      <Footer/>

    </Router>
  );
}

export default App;
