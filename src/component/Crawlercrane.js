import React from 'react'
import { useNavigate } from 'react-router-dom'
import crawlerCrane from '../assets/Crawler Cranes.png'


function Crawlercrane() {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1) // Go back to the previous page
    }
    return (
        <div className="section__container_cranes " >
            <h1 className='cranetitle'>Crawler Cranes.</h1>

            <img src={crawlerCrane} alt="Mobile Crane" className="more_info_image" />


            <div className="header__content">
                <h6>We provide crawler cranes from 100 to 400 ton with best price.</h6>
                <p className="section__description_allDetails">

                We offer a robust fleet of crawler cranes capable of lifting between 100 and 400 tons. Designed for heavy-duty applications, our crawler cranes provide exceptional stability, power, and precision.
                    </p>
                   
                   
                    <h6>Crawler Crane Advantages </h6>
                     
 
 
 
 

                    <p className="section__description_allDetails">

                    <span>Unmatched Stability:</span> Crawler undercarriage ensures firm grip on any terrain.<br/>
                    <span>Heavy Lifting Capacity:</span> Handle massive loads with ease and confidence.<br/>
                    <span>Versatility:</span> Suitable for a wide range of construction and industrial projects.<br/>
                    <span>Precision Control:</span> Operate with accuracy and efficiency.<br/>
                    <span>Durability:</span> Built to withstand demanding working conditions.<br/>
                    </p>

                    
 
 
 


                    <h6>Crawler Crane Applications:</h6>
                    <p className="section__description_allDetails">

                    <span>Construction:</span> Building erection, bridge construction, infrastructure development.<br/>
                    <span>Industrial:</span> Plant maintenance, equipment installation, heavy machinery handling.<br/>
                    <span>Energy:</span> Wind turbine installation, power plant construction.<br/>
                    <span>Oil and Gas:</span>  Pipeline installation, offshore operations.<br/>
                    </p>

                    




                    <h6>Why Choose Us?</h6>

                    <p className="section__description_allDetails">

                    Extensive experience in crawler crane operations<br/>
                    Well-maintained fleet of modern cranes<br/>
                    Competitive pricing<br/>
                    Expert operators<br/>
                    Customized solutions to meet your project needs<br/>
                </p>

                <div className="back-button-container">
                    <button onClick={handleBackClick} className="back-button">Back</button>
                </div>

            </div>
        </div>
    )
}

export default Crawlercrane