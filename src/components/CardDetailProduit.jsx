import React from "react";
import Button from "../components/Bouton";
import "../index.css";

function CardDetailProduit({ Titre, Description, Prix }) {
  return (
    <div className="">
      <div className="">
        <div className="h-100 d-flex flex-column justify-content-around">
          <div className="card-header p-0 border-0">
            <div className="">
              <p className="fs-2 fw-bold title"> {Titre}</p>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="">
              <p className="text-justify pb-5 mb-0">{Description}</p>
            </div>
          </div>
          <div className="card-footer p-0 pb-5 border-0">
            <div className="d-flex">
              <Button
                Color=" #010101"
                FontSize="16px"
                Border="1.75px solid #FFC20F"
                Name={`${Prix}FCFA`}
                BgColor={"white"}
                Padding="14px 53px"
                BorderRadius="8px"
                DisplayNone1="none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetailProduit;
