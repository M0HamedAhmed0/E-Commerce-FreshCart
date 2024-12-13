import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
    const sliderRef = React.useRef(null);
    const handleNext = () => sliderRef.current.slickNext();
    const handlePrev = () => sliderRef.current.slickPrev();
    const [categories, setCategories] = useState([]);

    const settings = {
        infinite: true,
        slidesToShow: 10,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed: 250,
        autoplay: true,
        autoplaySpeed: 700,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1380,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
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

    async function getAllCategories() {
        try {
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/categories"
            );
            setCategories(data.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="slider-container overflow-hidden">
            <Slider {...settings} ref={sliderRef}>
                {categories.map((item, index) => (
                    <div
                        key={item.id || index}
                        className="flex flex-col justify-center m-0 p-0 transition-all"
                    >
                        <img
                            className="object-cover h-64 w-full"
                            src={item.image}
                            alt={item.name}
                        />
                        <h2 className="text-left text-[28px] font-medium mt-2">
                            {item.name}
                        </h2>
                    </div>
                ))}
            </Slider>
            <div className="slider flex justify-center items-center mt-4 gap-4">
                <button
                    onClick={handlePrev}
                    className="px-2 py-1 bg-gray-300 rounded"
                ></button>
                <button
                    onClick={handleNext}
                    className="px-2 py-1 bg-gray-300 rounded"
                ></button>
            </div>
        </div>
    );
}
