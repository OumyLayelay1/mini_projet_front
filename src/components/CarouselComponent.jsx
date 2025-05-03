import React, { useState, useEffect } from "react";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'

function CarouselComponent({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const numItemsPerSlide = window.innerWidth <= 767 ? 1 : 1; // Un élément par diapositive pour les petits écrans

  const renderCarouselItems = () => {
    const items = [];
    for (let i = 0; i < data.length; i += numItemsPerSlide) {
      items.push(
        <Carousel.Item key={i}>
          <div className="">
            {data.slice(i, i + numItemsPerSlide).map((item, idx) => (
              <div key={item.id} className="flex items-center justify-center containAccueil">
              <div className="text-center">
                <img src={item?.image} alt="une image" className="imageCarousel" />
              </div>
            </div>
            ))}
          </div>
        </Carousel.Item>
      );
    }
    return items;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((activeIndex) => {
        const nextIndex = activeIndex + 1;
        return nextIndex >= Math.ceil(data.length / numItemsPerSlide) ? 0 : nextIndex;
      });
    }, 15000); // Changez la durée en millisecondes si nécessaire
    return () => {
      clearInterval(intervalId);
    };
  }, [data, numItemsPerSlide]);

  return (
    <section id="accueil" className="">
      <div className="carousel-container">
              <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
                {renderCarouselItems()}
              </Carousel>
      </div>
    </section>
  );
}

export default CarouselComponent;
