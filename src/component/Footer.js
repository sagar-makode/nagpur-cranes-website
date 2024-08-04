import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <section className="section__container" style={{ padding: '0' }}>
    <footer className="footer" id="contact">
        <div className="section__container footer__container">
            <div className="row">

                <div className="footer__col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto ">
                    <div className="logo footer__logo">
                        <Link to="/">Nagpur<span>Cranes</span></Link>
                    </div>
                    <p className="section__description">
                        At Nagpur Cranes, we offer a wide range of crane services to meet your lifting needs. Our experienced team ensures safe and efficient operations with competitive pricing.
                    </p>
                </div>
                <div className="footer__col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto mobileviewmargin ">
                    <h4>Services</h4>
                    <ul className="footer__links p-0">

                        <li><Link to="/mobilecrane">Mobile / Telescopic Cranes</Link></li>
                        <li><Link to="/crawlercrane">Crawler Cranes</Link></li>
                        <li><Link to="/faranacrane">Farana Cranes</Link></li>

                    </ul>
                </div>
                <div className="footer__col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto ">
                    <h4>Information</h4>
                    <ul className="footer__links p-0">
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contactus">Contact Us</Link></li>
    
                    </ul>
                </div>
                <div className="footer__col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
                    <h4>Company</h4>
                    <ul className="footer__links p-0">
                        <li><Link to="/">Terms of Service</Link></li>
                        <li><Link to="/">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer__bar">
            Copyright © 2024 NagpurCranes. All rights reserved.
        </div>
    </footer>


</section>
  )
}

export default Footer