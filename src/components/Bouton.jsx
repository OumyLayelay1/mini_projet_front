import React from 'react'
import Button from 'react-bootstrap/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Bouton({
        Name,
        BgColor,
        Color,
        Border,
        FontSize,Width,
        Padding, BorderRadius, Disabled, Onclick, Icon, btnicone, boutonheader, Type
      }) 
{

  return (
    <div>
        <div>
          <Button className={`d-flex align-items-center justify-content-center ${boutonheader} ${btnicone}`}  style={{background: `${BgColor}`, color: `${Color}`, border: `${Border}`, 
                  textTransform: 'uppercase', fontWeight: '600', fontSize: `${FontSize}`, width: `${Width}`,padding: `${Padding}`,
                  borderRadius: `${BorderRadius}`, fontFamily: 'Poppins'}} disabled={Disabled} onClick={Onclick} type={Type}>
                {Icon} &ensp;<span className="">{Name}</span> 
          </Button>
          <ToastContainer />
        </div>
    </div>
  )
}

export default Bouton