import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
} from "../../assets/index";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} arrowNext`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    />
  );
}

function Banner() {
  var settings = {
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="banner">
      <Slider {...settings}>
        <div className="bannerImgCont">
          <img src={bannerImgOne} alt="bannerImgOne" />
        </div>
        <div className="bannerImgCont">
          <img src={bannerImgTwo} alt="bannerImgTwo" />
        </div>
        <div className="bannerImgCont">
          <img src={bannerImgThree} alt="bannerImgThree" />
        </div>
        <div className="bannerImgCont">
          <img src={bannerImgFour} alt="bannerImgFour" />
        </div>
      </Slider>
    </div>
  );
}

export default Banner;
