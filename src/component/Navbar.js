import React, { useEffect, useRef, useState } from 'react';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const navbarRef = useRef(null);



 

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };
  return (

    <div>



      <div>
        <div ref={navbarRef} className=" position-relative">
          <nav className="navbar navbar-expand-lg navbar-light  nav__header">
            <Link to="/" className="navbar-brand p-0">
              <div className="logo nav__logo">
                <Link to="/">Nagpur<span>Cranes</span></Link>
              </div>
            </Link>
            <button className="navbar-toggler nav__menu__btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
              <span>
                {false ? <RiCloseLine /> : <RiMenuLine />}
              </span>
            </button>
            <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarCollapse" >
              <div className="navbar-nav mx-auto py-0">
                <Link to="/" className="nav_text nav-item nav-link active" onClick={closeNavbar}>Home</Link>
                <div className="nav-item dropdown">
                  <Link to="/" className=" nav_text nav-link  dropdown-toggle active" data-bs-toggle="dropdown">Services</Link>
                  <div className="dropdown-menu m-0">
                    <Link to="/faranacrane" className="dropdown-item" onClick={closeNavbar}>Farana Cranes</Link>
                    <Link to="/crawlercrane" className="dropdown-item" onClick={closeNavbar}>Crawler Cranes</Link>
                    <Link to="/mobilecrane" className="dropdown-item" onClick={closeNavbar}>Mobile / Telescopic Cranes</Link>
                  </div>
                </div>

                <Link to="/aboutus" className=" nav_text nav-item nav-link active" onClick={closeNavbar}>About Us</Link>
                <Link to="/contactus" className=" nav_text nav-item nav-link active" onClick={closeNavbar}>Contact Us</Link>

              </div>

              
              <div className="d-none d-lg-flex">
                <div className="map_text">
                  <Link to="tel:+917385703929">
                    <span className="material-symbols-outlined location_icon">call</span>
                  </Link>
                </div>
                <div className="map_text">
                  <Link to="mailto:maheshtathe0411@gmail.com">
                    <span className="material-symbols-outlined location_icon">mail</span>
                  </Link>
                </div>
                <div className="map_text">
                  <Link to="https://maps.app.goo.gl/hb8HtDtNTgWQcLt79"target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined location_icon">location_on</span>
                  </Link>
                </div>
              </div>
           

          
            </div>
          </nav>



        </div>

      </div>


    </div>
  );
}

export default Navbar;
