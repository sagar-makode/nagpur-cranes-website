import React from 'react'
import { Link } from 'react-router-dom'

function ContactUs() {
    return (

        <section className="section__container" style={{ padding: '0' }}>
            <h2 className="section__header_mainname">Contact Us</h2>


            <div className="address_section_contactus layout_padding">
                <div className="address_container_contactUs">

                    <div className="row">

                        <div className="col-lg-12 col-sm-12">
                            <div className="map_text_contactus"><Link>  <span className="material-symbols-outlined location_icon_contactus">
                                person
                            </span> <span className="">Mahesh Tathe</span></Link></div>
                        </div>

                        <div className="col-lg-12 col-sm-12">
                            <div className="map_text_contactus"> <Link to="tel:+917385703929">  <span className="material-symbols-outlined location_icon_contactus">
                                call
                            </span> <span className="">+91 7385703929</span></Link></div>
                        </div>


                        <div className="col-lg-12 col-sm-12">
                            <div className="map_text_contactus"><Link to="mailto:maheshtathe0411@gmail.com"><span className="material-symbols-outlined location_icon_contactus">
                                mail
                            </span><span className="">maheshtathe0411@gmail.com</span> </Link></div>
                        </div>
                    </div>

                 
                    <div className="col-lg-12 col-sm-12">
                        <div className="map_text_contactus"><Link to="https://maps.app.goo.gl/yuQYcNKiiSNef5AU7" target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined location_icon_contactus">
                            location_on
                        </span><span className="">Plot no. 1154 Ward no. 3 Dobinagar  Wadadhamana Amaravati Road Nagpur-440023</span> </Link></div>

                    </div>
                </div>
            </div>
            <section className="section__container">
                <div className='section__container_map'>

                    <div style={{ width: '100%', height: '450px', overflow: 'hidden' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1860.5259595821913!2d79.00438900000002!3d21.150332!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA5JzAwLjAiTiA3OcKwMDAnMTUuOCJF!5e0!3m2!1sen!2sus!4v1722630257461!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: '0' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Location"
                        ></iframe>
                    </div>

                </div>
            </section>
        </section>

    )
}

export default ContactUs