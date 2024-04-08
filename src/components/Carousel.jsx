import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import './StylesCarousel.css';

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((index + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    // Clean up function
    return () => {
      clearInterval(timer);
    };
  }, [index, images]);

  const nextSlide = () => {
    setIndex((index + 1) % images.length);
  };

  const prevSlide = () => {
    const nextIndex = index - 1;
    setIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg shadow-2xl">
        <div className="w-full flex justify-center">
          {images.map((image, idx) => (
            <Transition
              key={idx}
              show={index === idx}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <img src={image} alt={`slide-${idx}`} className="w-full object-cover h-64 md:h-96 carousel-image shadow-lg" />
            </Transition>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-red-500 text-white p-2 rounded-full hover:from-purple-700 hover:to-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-red-500 text-white p-2 rounded-full hover:from-purple-700 hover:to-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Next
      </button>
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full ${index === idx ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;