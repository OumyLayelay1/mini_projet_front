import React from 'react'
import Logo2 from '../assets/Images/logoFoot.png'
import {BiLogoWhatsapp, BiPhoneCall} from 'react-icons/bi'
import FooterIconNumComponent from '../components/Footer/FooterIconNumComponent'
import {FaLinkedin} from 'react-icons/fa'
import {TfiEmail} from 'react-icons/tfi'
import "../index.css"

function Footer() {
  return (
    <footer className='bg-footer'>
        <div className="container">
           <div className="row py-5">
           <div className="col-12 col-md-6 col-lg-4">
           <div className="">
               <img src={Logo2} alt="Logo" className='w-50' />
            </div>
           </div>
               <div className="col-12 col-md-6 col-lg-4">
                  <div className="">
                     <div className="">
                        <p className="text-white fw-bold fs-5">Contactez-nous</p>
                        <FooterIconNumComponent
                           Nom= 'WhatsApp'
                           LienWhatsapp={'https://wa.me/221771286354'}
                           Num= '+221 77 128 63 54'
                           Icon= {<BiLogoWhatsapp/>}
                        />
                        <FooterIconNumComponent
                           Nom= 'Téléphone'
                           LienWhatsapp={'tel:+221771286354'}
                           Num= '+221 77 128 63 54'
                           Icon= {<BiPhoneCall/>}
                        />
                        <FooterIconNumComponent
                           Nom= 'Email'
                           LienWhatsapp={'mailto:kaneoumylaye@gmail.com'}
                           Num= 'kaneoumylaye@gmail.com'
                           Icon= {<TfiEmail/>}
                        />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 col-lg-4">
                  <div className="p-lg-0 p-md-0">
                     <p className="text-white fw-bold fs-5 titreContact">Suivez-nous</p>
                     <FooterIconNumComponent
                        Num= 'LinkedIn'
                        LienWhatsapp={'https://www.linkedin.com/in/oumylayekane'}
                        Icon= {<FaLinkedin/>}
                     />
                  </div>
               </div>
           </div>
        </div>
        <div className="container">
            <div className="text-center">
               <p className='text-center text-white mb-0 copyRight'>© 2025 All rights reserved</p>
            </div>
         </div>
    </footer> 
  )
}

export default Footer