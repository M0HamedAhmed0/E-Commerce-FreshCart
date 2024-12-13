import Slider from "react-slick";
import bag from "../../assets/bag.jpg";
import bags from "../../assets/bags.jpg";
import babyChair from "../../assets/baby chair.jpg";
import accessories from "../../assets/accessories.jpg";
import Music from "../../assets/Music devices.jpg";
import React from "react";

export default function MainSlider() {
    const sliderRef2 = React.useRef(null);
    const settings2 = {
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1380,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const handleNext2 = () => sliderRef2.current.slickNext();
    const handlePrev2 = () => sliderRef2.current.slickPrev();

    return (
        <div className="container max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto my-9 py-4 md:px-0">
            <div className="row flex m-auto justify-center items-center md:items-stretch flex-col md:flex-row gap-5 md:gap-0 w-3/5">
                <div className="imageLeft w-10/12  md:w-[40%]">
                    <Slider {...settings2} ref={sliderRef2}>
                        <img className="w-full object-cover" src={bag} alt="" />
                        <img
                            className="w-full object-cover"
                            src={babyChair}
                            alt=""
                        />
                        <img
                            className="w-full object-cover"
                            src={accessories}
                            alt=""
                        />
                    </Slider>
                    <div className="slider flex justify-center items-center mt-4 gap-4">
                        <button
                            onClick={handlePrev2}
                            className="px-2 py-1 bg-gray-300 rounded"
                        ></button>
                        <button
                            onClick={handleNext2}
                            className="px-2 py-1 bg-gray-300 rounded"
                        ></button>
                    </div>
                </div>
                <div className="imageRight w-10/12  md:w-[40%]">
                    <img className="w-full object-contain" src={bags} alt="" />
                    <img className="w-full object-contain" src={Music} alt="" />
                </div>
            </div>
        </div>
    );
}
