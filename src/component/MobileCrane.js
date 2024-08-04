import React from 'react'
import mobileCrane from '../assets/mobileCrain.png'
import { useNavigate } from 'react-router-dom'

function MobileCrane() {
    const navigate = useNavigate()
    const handleBackClick = () => {
        navigate(-1) // Go back to the previous page
    }
    return (

        <div className="section__container_cranes " >
            <h1 className='cranetitle'>Mobile / Telescopic Crane.</h1>

            <img src={mobileCrane} alt="Mobile Crane" className="more_info_image" />


            <div className="header__content">
                <h6> We provide mobile and telescopic cranes ranging from 30 tons to 400 tons at the best prices. </h6>
                <p className="section__description_allDetails">

                    We offer a comprehensive range of mobile and telescopic cranes, catering to projects of all sizes and complexities. From compact 30-ton units to powerful 400-ton behemoths, our fleet is designed to handle your lifting needs with precision and efficiency.

                    </p>
                   
                   
                    <h6>Our Mobile Crane Services Include:</h6>
                    <p className="section__description_allDetails">

                    <span>Heavy Equipment Transportation:</span> Safely and securely move large machinery and industrial equipment.<br/>
                    <span>Construction Site Lifting:</span> Efficiently lift and position construction materials and components.<br/>
                    <span>Wind Turbine Installation:</span> Specialized equipment and expertise for wind energy projects.<br/>
                    <span>Industrial Plant Maintenance:</span> Provide crane services for routine maintenance and overhauls.<br/>
                    <span>Emergency Response:</span> Rapid deployment of cranes for disaster relief and recovery operations.<br/>
                    </p>

                    <h6>Telescopic Crane Capabilities:</h6>
                    <p className="section__description_allDetails">

                    <span>Versatility:</span> Extendable booms for reaching various heights and distances.<br/>
                    <span>Compactness:</span> Ideal for tight workspaces and confined areas.<br/>
                    <span>Speed:</span> Quick setup and operation for efficient job completion.<br/>
                    <span>Capacity:</span> Handle heavy loads with precision and control.<br/>
                    </p>
                    <h6>Why Choose Us: </h6>

                    <p className="section__description_allDetails">

                    <span>Experienced Operators:</span> Our skilled team ensures safe and efficient operations.<br/>
                    <span>Modern Fleet:</span> Well-maintained cranes for optimal performance and reliability.<br/>
                    <span>Customized Solutions:</span> Tailored services to meet your specific project requirements.<br/>
                    <span>Competitive Pricing:</span> Cost-effective crane rental options.<br/>
                    <span>Safety First:</span> Adherence to industry safety standards and regulations.<br/>
                </p>

                <div className="back-button-container">
                    <button onClick={handleBackClick} className="back-button">Back</button>
                </div>

            </div>
        </div>
       
    )
}

export default MobileCrane
