import React from "react";
import { Link } from 'react-router-dom'

function Card({ Titre, Prix, Image, Description, profession, number, lien, className, alt }) {
  return (
    <div className="col-md-6 col-lg-3 col-sm-6 col-xs-12 responsiveDetailProduit">
      <Link to={lien} className={`containLinkCard ${className}`}>
      <div className="h-100 card border-0">
        <div className="h-100 d-flex flex-column justify-content-between">
          <div className="card-body border-0 d-flex justify-content-start px-0 py-3">
            <div className="bg-white shadow border border-1 rounded">
              <img src={Image} alt={alt} className="w-100" />
              <div className="py-4 px-3">
                <div>
                  <div className="d-flex justify-content-between align-items-baseline gap-2">
                    <p className="mb-0 pb-0 fs-5 fw-bolder title">{Titre}</p>
                    <p className="fw-lighter fs-6">{Prix}</p>
                  </div>
                  <p className="">
                    {Description}
                  </p>
                  <p className="">
                    {number}
                  </p>
                  <p className="">
                    {profession}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </Link>
    </div>
  );
}

export default Card;
