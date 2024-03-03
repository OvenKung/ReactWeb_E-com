import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((index + 1) % images.length);
  };

  const prevSlide = () => {
    const nextIndex = index - 1;
    setIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
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
              <img src={image} alt={`slide-${idx}`} className="w-full object-cover h-64 md:h-96" />
            </Transition>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;