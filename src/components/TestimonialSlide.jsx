import { useState, useEffect } from "react";
import Dot1 from "../assets/dot1.png";
import Dot2 from "../assets/dot2.png";
import PreviousSlide from "../assets/previous.png";
import NextSlide from "../assets/forward.png";
import slideDb from "./db/SlideDb";

const TestimonialSlide = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);
  
    const handleNextClick = () => {
      if (currentIndex + itemsPerPage < slideDb.length) {
        setCurrentIndex(currentIndex + itemsPerPage);
      }
    };
  
    const handlePreviousClick = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - itemsPerPage);
      }
    };
  
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
  
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(1); // Set 1 item per page for small screens
      } else {
        setItemsPerPage(2); // Set 2 items per page for larger screens
      }
    };
  
    useEffect(() => {
      // Update itemsPerPage on mount and window resize
      updateItemsPerPage();
      window.addEventListener("resize", updateItemsPerPage);
  
      return () => {
        // Cleanup the event listener on component unmount
        window.removeEventListener("resize", updateItemsPerPage);
      };
    }, []);
  
    const numberOfPairs = Math.ceil(slideDb.length / itemsPerPage);

  return (
    <div className="max-w-[96%] md:max-w-[90%] w-[100%] text-center">
      <p className="text-[36px]">Testimonials</p>

      {/* Slides */}
      <div className="mb-36">
        <div className="relative w-full overflow-x-hidden px-[1.8rem]">
          {currentIndex > 0 && (
            <img
              src={PreviousSlide}
              onClick={handlePreviousClick}
              alt=""
              className="absolute z-10 cursor-pointer left-[0.75rem] top-[50%]"
            />
          )}

          {/* Slide mapping */}
          <div className="slider-container w-full flex items-center gap-10">
            {slideDb
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((slide) => {
                const { id, text, name, title, star, image } = slide;
                return (
                  <div
                    key={id}
                    className="relative slideBox slide border-2 border-gray-400 min-w-[100%] md:min-w-[49%] w-[100%] h-[400px] lg:h-[300px] text-start space-y-7 py-12 px-4"
                  >
                    <p>{text}</p>
                    <div className="lg:flex items-center justify-between">
                      <div className="mb-4 lg:mb-0 flex items-center  gap-2">
                        <img className="w-[60px]" src={image} alt="" />
                        <p>
                          <span className="font-semibold me-3">{name}</span>
                          <br />
                          {title}
                        </p>
                      </div>
                      <img src={star} alt="" className="" />
                    </div>
                  </div>
                );
              })}
          </div>

          {currentIndex + itemsPerPage < slideDb.length && (
            <img
              src={NextSlide}
              onClick={handleNextClick}
              alt=""
              className="absolute cursor-pointer z-50 right-[0.9rem] md:right-[0.1rem] top-[50%]"
            />
          )}
        </div>

        {/* Slide Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {Array(numberOfPairs).fill().map((_, pairIndex) => (
            <div
              className="text-2xl cursor-pointer"
              key={pairIndex}
              onClick={() => goToSlide(pairIndex * itemsPerPage)}
            >
              <img
                src={pairIndex === Math.floor(currentIndex / itemsPerPage) ? Dot1 : Dot2}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlide;
