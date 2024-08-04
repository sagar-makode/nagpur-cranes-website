import React from 'react'
import { useNavigate } from 'react-router-dom'

function AboutUs() {
    const navigate = useNavigate()
    const handleBackClick = () => {
        navigate(-1) // Go back to the previous page
    }
    return (
        <div>
            <section className="section__container special__container " id="special" >
            <h2 className="section__header">About Us</h2>
             

            <div className="header__content">
                <h6>  Nagpur Cranes Service: Your Reliable Lifting Partner. </h6>
                <p className="section__description_allDetails">

                As a leading crane service provider, Nagpur Cranes Service offers a comprehensive range of cranes to cater to the diverse lifting needs of our clients across Maharashtra, Madhya Pradesh, Chhattisgarh, and Odisha. With years of industry experience and a dedicated team of professionals, we ensure efficient, safe, and reliable crane operations for every project. Our fleet boasts a wide array of cranes, including farana, telescopic, mobile, crawler, allowing us to handle projects of any scale. Whether it's construction, industrial operations, or heavy equipment transportation, we provide tailored solutions to meet your specific requirements.<br/>
                At Nagpur Cranes Service, safety is our top priority. We adhere to stringent industry standards and conduct thorough inspections and maintenance to ensure the optimal performance and safety of our equipment. Our experienced operators are highly skilled and committed to delivering exceptional service.<br/>
                Choose Nagpur Cranes Service for your lifting needs and experience the difference of working with a trusted partner.
                    </p>
                   
                   
                    <h6>Our Commitment:</h6>
                     
                     
                     
                       
                    <p className="section__description_allDetails">

                    <span>Safety:</span> Adherence to stringent safety protocols.<br/>
                    <span>Quality:</span> Delivering top-notch equipment and services.<br/>
                    <span>Efficiency:</span> Optimizing operations for timely project completion.<br/>
                    <span>Customer Focus:</span> Understanding and exceeding client expectations <br/>
                    </p>

                  
                <div className="back-button-container">
                    <button onClick={handleBackClick} className="back-button">Back</button>
                </div>

            </div>
    
            </section>

        </div>
    )
}

export default AboutUs