import React from 'react'
import { useNavigate } from 'react-router-dom'
import faranacrane from '../assets/faranacrane.png'

function Faranacrane() {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1) // Go back to the previous page
    }
    return (
        <div className="section__container_cranes " >
            <h1 className='cranetitle'>Farana Cranes.</h1>

            <img src={faranacrane} alt="Mobile Crane" className="more_info_image" />


            <div className="header__content">
                <h6> We provide farana cranes from 15 to 30 ton with best price. </h6>
                <p className="section__description_allDetails">

                We specialize in providing high-quality Farana cranes with lifting capacities ranging from 15 to 30 tons. Our competitively priced cranes are ideal for a variety of applications, offering exceptional performance and reliability.

                    </p>
                   
                   
                    <h6>Farana Crane Benefits:</h6>
                     
 
 
 

                    <p className="section__description_allDetails">

                    <span>Compact Design:</span> Ideal for tight workspaces and confined areas.<br/>
                    <span>Versatility:</span> Suitable for a wide range of lifting tasks.<br/>
                    <span>Efficiency:</span> Quick setup and operation for time-saving productivity.<br/>
                    <span>Safety:</span> Equipped with advanced safety features for peace of mind.<br/>
                    <span>Durability:</span>  Built to withstand demanding working conditions.<br/>
                    </p>




                    <h6>Applications:</h6>
                    <p className="section__description_allDetails">

                    <span> Construction</span><br/>
                    <span>Industrial operations</span> <br/>
                    <span>Logistics and transportation  </span> <br/>
                    <span>Plant maintenance</span> <br/>
                    <span>Emergency response</span><br/>

                    </p>
                    <h6>Why Choose Us: </h6>
                    



                    <p className="section__description_allDetails">

                    <span>Competitive pricing</span><br/>
                    <span>Expert team</span><br/>
                    <span>Well-maintained equipment</span><br/>
                    <span>Excellent customer service</span><br/>
                    <span>Fast delivery and setup</span><br/>
                </p>

                <div className="back-button-container">
                    <button onClick={handleBackClick} className="back-button">Back</button>
                </div>

            </div>
        </div>
    )
}

export default Faranacrane