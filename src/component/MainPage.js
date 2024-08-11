import React, { useEffect } from 'react'
import './MainPage.css'
import faranacrane from "../assets/faranacrane.png"
import crawlercranes from "../assets/Crawler Cranes.png"
import mobilecranes from "../assets/mobileCrain.png"
import { Link, useNavigate } from 'react-router-dom'
import 'aos/dist/aos.css';
import AOS from 'aos';
import mainImg from "../assets/mainImg.png"


function MainPage() {

    useEffect(() => {
        AOS.init({ duration: 2000 }); // Adjust duration as needed
    }, []);

    const navigate = useNavigate();
    return (
        <div>
            <div className="section__container_main header__container" id="home">
                <div className="header__image" >
                    <img src={mainImg} alt="header" data-aos="fade-left" />
                </div>
                <div className="header__content" data-aos="fade-up">
                    <h1>Welcome to <span>Nagpur Cranes</span> Service.</h1>
                    <p className="section__description">
                        We are a leading crane service provider offering a wide range of cranes for various projects. With years of experience and a dedicated team, we ensure efficient and safe crane operations.
                    </p>

                </div>
            </div>


            <section className="section__container special__container " data-aos="fade-up" id="special" >

                <h2 className="section__header" >About Us</h2>
                <p className="section__description">
                    Nagpur Cranes Service is a leading provider of crane rental and services in Nagpur, Maharashtra, with a strong presence across Madhya Pradesh, Chhattisgarh, and Odisha. We offer a comprehensive range of cranes, including farana, telescopic, mobile, crawler, and boom lifters, to cater to the diverse lifting needs of our clients.

                    Our commitment to delivering exceptional service, coupled with competitive pricing, has made us a preferred choice for businesses and individuals alike.                </p>

                <div className="back-button-container mb-4">
                    <button onClick={() => navigate('/aboutus')} className="back-button">Read More</button>
                </div>
            </section>

            <h2 className="section__header" data-aos="fade-up">Our Services</h2>
            <section className="section__container explore__container">
                <div className="explore__image" data-aos="fade-right">
                    <img src={mobilecranes} alt="explore" />
                </div>
                <div className="explore__content" data-aos="fade-up">
                    <h1 className="section__header" >Mobile / Telescopic Crane</h1>
                    <p className="section__description">
                        We provide mobile and telescopic cranes ranging from 30 tons to 400 tons at the best prices.
                    </p>
                    <div className="explore__btn">
                        <button className="main_btn" onClick={() => navigate('/mobilecrane')} >
                            Read More <span></span>
                        </button>
                    </div>
                </div>
            </section>




            <section className="chef" id="chef">
                <div className="section__container chef__container">

                    <img src={faranacrane} alt="topping" className="chef__image" data-aos="fade-left" />

                    <div className="chef__content" data-aos="fade-up">
                        <h2 className="section__header" >Farana Cranes</h2>
                        <p className="section__description">
                            We provide farana cranes from 15 to 30 ton with best price

                        </p>
                        <div className="explore__btn">
                            <button className="main_btn" onClick={() => navigate('/faranacrane')}>
                                Read More <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section__container explore__container reverse-order">
                <div className="explore__image" data-aos="fade-right">
                    <img src={crawlercranes} alt="explore" />
                </div>
                <div className="explore__content" data-aos="fade-up">
                    <h1 className="section__header">Crawler Cranes</h1>
                    <p className="section__description">
                        We provide crawler cranes from 100 to 400 ton with best price
                    </p>
                    <div className="explore__btn">
                        <button className="main_btn" onClick={() => navigate('/crawlercrane')}>
                            Read More <span></span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="section__container" >
                <div className='section__container_map' >

                    <div style={{ width: '100%', height: '450px', overflow: 'hidden' }}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3721.366827788006!2d78.95019837525959!3d21.137795080538996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA4JzE2LjEiTiA3OMKwNTcnMTAuMCJF!5e0!3m2!1sen!2sin!4v1723359242062!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: '0' }}
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            title="Google Maps Location"

                        >

                        </iframe>

                    </div>

                </div>
            </section>

            <section className="section__container" style={{ padding: '0' }}>

                <div className="address_section layout_padding">
                    <div className="address_container">

                        <div className="row">

                            <div className="col-lg-4 col-sm-12">
                                <div className="map_text"><Link>  <span className="material-symbols-outlined location_icon">
                                    person
                                </span> <span className="">Mahesh Tathe</span></Link></div>
                            </div>

                            <div className="col-lg-4 col-sm-12">
                                <div className="map_text"><Link to="tel:+917385703929">  <span className="material-symbols-outlined location_icon">
                                    call
                                </span> <span className="">+91 7385703929</span></Link></div>
                            </div>


                            <div className="col-lg-4 col-sm-12">
                                <div className="map_text"><Link to="mailto:maheshtathe0411@gmail.com"><span className="material-symbols-outlined location_icon">
                                    mail
                                </span><span className="">maheshtathe0411@gmail.com</span></Link></div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <div className="map_text"><Link to="https://maps.app.goo.gl/yuQYcNKiiSNef5AU7" target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined location_icon">
                                location_on
                            </span><span className="">Plot no. 1154 Ward no. 3 Dobinagar  Wadadhamana Amaravati Road Nagpur-440023</span></Link></div>

                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default MainPage