import React, { useEffect, useState } from "react";

// Function to import all images from a folder dynamically
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// Import all images from the folder
const imageList = importAll(require.context('../images/veggie21', false, /\.(png|jpe?g|svg)$/));

// const images = {
//   'image1.jpg': require('../images/veggie21/delete.png'),
//   // Add more images as needed
// };

const ImageCarousel = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [imageNames, setImageNames] = useState([]);
  const [currentImageName, setCurrentImageName] = useState("");


  useEffect(() => {
    if (imageList) {
      setImageCount(Object.keys(imageList).length)
      setImageNames(Object.keys(imageList));
      setCurrentImageName(imageNames[0]);
    }
  }, []);

  const prevImage = () => {
    console.log(" b4", imageIndex)
    if (imageIndex - 1 < 0) {
      return;
    }
    setImageIndex(imageIndex - 1)

    console.log("ImageIndex", imageIndex)
    setCurrentImageName(imageNames[imageIndex]);
  }

  const nextImage = () => {
    console.log(" b4", imageIndex)
    if (imageIndex + 1 >= imageCount) {
        return ;
    }

    setImageIndex(imageIndex + 1)
    

    console.log("ImageIndex", imageIndex)
    setCurrentImageName(imageNames[imageIndex]);
  }

  console.log(imageNames)

  return (
    <>
      <div className="slideshow-container">

          {imageNames &&
            imageNames.map((imageName, index) => {
              console.log(index, imageIndex)
              const displayMode = index === imageIndex ? "block" : "none"
              return (
                // <div className="mySlides fade" key={index} style={{display: `${index} === ${imageIndex} ? 'block' : 'none'`}}>
                <div className="mySlides fade" key={index} style={{display: displayMode}}>
                  <div className="numbertext">{index + 1} / {imageCount}
                    <img key={index} src={imageList[imageName]} alt={imageName} style={{ width: "100px" }} />
                  </div>
                </div>
              )
            })
          }
          {/* <div className="numbertext">1 / 3</div>
          <img src="img1.jpg" style={{ width: "100%" }} /> */}
          {/* <div className="text">Caption Text</div> */}

        {/* <a className="prev" onClick={prevImage}>&#10094;</a> */}
        {/* <a className="next" onClick={nextImage}>&#10095;</a> */}
        <a className="prev" style={{cursor: "pointer"}} onClick={prevImage}>prev     </a>
        <a className="next" style={{ cursor: "pointer" }}  onClick={nextImage}>next</a>
      </div>
      <br />

      <div style={{ display: "block", textAlign: "center", height: "25px" }}>
        <span className="dot active" ></span>
        <span className="dot" ></span>
        <span className="dot" ></span>
      </div>
    </>
  )
}

export default ImageCarousel;