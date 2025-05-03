import React from 'react'
import { Link } from 'react-router-dom'

function FooterIconNumComponent({
    LienWhatsapp, 
    Num,Nom,Icon
}) {
  return (
    <div>
        <div className="d-flex align-items-baseline contIcon">
            <div className="text-justify">
                <Link to={LienWhatsapp} target="_blank" rel="noopener noreferrer" className='fs-4 text-white'>
                    {Icon}
                </Link>
            </div>
            <div className="fw-semibold ps-2 fs-6 contText text-white">
                <p className='pb-0 mb-0'>{Nom}</p>
                <p>
                    <Link to={LienWhatsapp} target="_blank" rel="noopener noreferrer" className='text-white'>
                        {Num}
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default FooterIconNumComponent