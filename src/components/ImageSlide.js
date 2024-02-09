import React, { useEffect, useState } from 'react';
import '../css/ImageSlide.css'; 

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// Import all images from the folder
const imageList = importAll(require.context('../images/veggie21', false, /\.(png|jpe?g|svg)$/));

// An array of image file names. 
// This is used to access the image in imageList by file name.
const imageNames = Object.keys(imageList);

const ImageSlide = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(currentImageIndex);
    const timeout = setTimeout(() => {
      setActiveImageIndex(-1); // Reset activeImageIndex after the transition time
    }, 500); // Adjust according to transition time
    return () => clearTimeout(timeout);
  }, [currentImageIndex]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageNames.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageNames.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="image-carousel-container">
      <div className="image-container">
        <img src={imageList[imageNames[currentImageIndex]]} 
             alt={`Image ${currentImageIndex}`} 
             className={activeImageIndex === currentImageIndex ? 'active' : ''}
        />
        <div className="left-button" onClick={goToPrevious}>
          &lt;
        </div>
        <div className="right-button" onClick={goToNext}>
          &gt;
        </div>
      </div>
      <div className="indicator-container">
        {imageNames.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentImageIndex === index ? 'active' : ''}`}
            onClick={() => goToImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlide;