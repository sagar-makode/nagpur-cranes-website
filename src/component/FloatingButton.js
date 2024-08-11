import React, { useState } from 'react';
import {
    FloatingMenu,
    MainButton,
    ChildButton
} from 'react-floating-button-menu';
import { MdAdd, MdClose, MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';

  
function FloatingButton() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <FloatingMenu
    slideSpeed={500}
    direction="up"
    spacing={8}
    isOpen={isOpen}
    className="floating-button-menu" 
>
    <MainButton
        iconResting={<MdAdd style={{ fontSize: 30, color:"red" }} />}
        iconActive={<MdClose style={{ fontSize: 30, color:"red" }} />}
        backgroundColor="black"
        onClick={() => setIsOpen(!isOpen)}
        size={60}
    />
     <ChildButton
        icon={<MdLocationOn style={{ fontSize: 20, color:"#fe9c41" }} />}
        backgroundColor="white"
        size={46}
         className="floating-menu__item"
        onClick={() => window.open('https://maps.app.goo.gl/yuQYcNKiiSNef5AU7', '_blank')}
    />
    <ChildButton
        icon={<MdEmail style={{ fontSize: 20, color:"#0078d4" }} />}
        backgroundColor="white"
        size={46}
         className="floating-menu__item"
        onClick={() => window.location.href = 'mailto:maheshtathe0411@gmail.com'}
    />
   
    <ChildButton
        icon={<MdPhone style={{ fontSize: 20, color:"green" }} />}
        backgroundColor="white"
        size={46}
        onClick={() => window.location.href = 'tel:+917385703929'}
         className="floating-menu__item"
    />
</FloatingMenu>
  )
}

export default FloatingButton