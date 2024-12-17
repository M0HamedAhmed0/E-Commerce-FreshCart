import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CounterContext } from "../Context/CounterContext";

export default function ProductDetails() {
    const param = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const { setCountItem } = useContext(CounterContext);

    const [likedStates, setLikedStates] = useState(() => {
        const saved = localStorage.getItem("likedProducts");
        return saved ? JSON.parse(saved) : {};
    });

    const sliderRef = React.useRef(null);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplaySpeed: 700,
    };

    const handleNext = () => sliderRef.current.slickNext();
    const handlePrev = () => sliderRef.current.slickPrev();

    async function addProduct(e, id) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId: id,
                },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setIsLoading(true);
            toast.success(" 🛒 Added A Product In Cart Successfully", {
                position: "top-right",
                style: {
                    background: "#4fa74f",
                    fontSize: "20px",
                    color: "#fff",
                },
            });
            setCountItem(data.numOfCartItems);
        } catch (error) {
            console.log(error);
            toast.error("Failed To Add Product To Cart");
        } finally {
            setIsLoading(false);
        }
    }
    async function getProductDetails() {
        try {
            setIsLoading(true);
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/products/${param.id}`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setProductDetails(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function addProductToWishList(e, id) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    productId: id,
                },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setIsLoading(true);
            setLikedStates((prev) => {
                const newState = {
                    ...prev,
                    [id]: !prev[id],
                };
                localStorage.setItem("likedProducts", JSON.stringify(newState));
                return newState;
            });
            toast.success(" ❤️ Added A Product In WishList Successfully", {
                position: "top-right",
                style: {
                    background: "#4fa74f",
                    fontSize: "20px",
                    color: "#fff",
                },
            });
            console.log(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed To Add Product To Cart");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Product Details </title>
                </Helmet>
            </HelmetProvider>
            <div className="container sm:max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-center p-4 md:py-4 md:px-0">
                {productDetails ? (
                    <div className="product flex flex-col md:flex-row items-center my-28 w-full">
                        <div className="product-image w-full md:w-2/4">
                            <div className="slider-container max-w-screen-xl mx-auto">
                                <Slider {...settings} ref={sliderRef}>
                                    {productDetails?.images.map(
                                        (img, index) => (
                                            <div
                                                aria-hidden="true"
                                                key={img.id || index}
                                                className="w-full md:w-2/4 m-auto px-20 md:px-0 xl:px-20"
                                            >
                                                <img
                                                    className="w-full object-cover"
                                                    src={img}
                                                    alt={
                                                        productDetails.title ||
                                                        "Product Image"
                                                    }
                                                />
                                            </div>
                                        )
                                    )}
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
                        </div>
                        <div className="product-info p-5 pr-0 w-full">
                            <div className="title">
                                <h2 className="text-[32px] font-medium mb-1">
                                    {productDetails.title}
                                </h2>
                                <h3 className="text-gray-800 mb-2">
                                    {productDetails.description ||
                                        "No description available."}
                                </h3>
                            </div>
                            <div className="flex justify-between items-center my-3">
                                <div className="price">
                                    <h4 className="text-xl font-bold">
                                        {productDetails.price} EGP
                                    </h4>
                                </div>
                                <div className="rating">
                                    <span>
                                        <i className="fa-solid fa-star text-yellow-300" />
                                        {productDetails.ratingsAverage}
                                    </span>
                                </div>
                            </div>
                            <div className="buttons flex items-center justify-center mt-6">
                                <button
                                    onClick={(e) =>
                                        addProduct(e, productDetails.id)
                                    }
                                    className="btn-green bg-[#22db14] transition-colors hover:bg-[#22c710] w-5/6 m-auto"
                                >
                                    + Add
                                </button>
                                <i
                                    onClick={(e) =>
                                        addProductToWishList(
                                            e,
                                            productDetails.id
                                        )
                                    }
                                    className={`fa-solid fa-heart text-2xl transition-colors cursor-pointer ${
                                        likedStates[productDetails.id]
                                            ? "text-red-600"
                                            : "text-stone-700 hover:text-red-600"
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className=" h-16 w-16 ">
                        <i className="fa-solid fa-spinner fa-spin text-7xl text-white" />
                    </div>
                </div>
            )}
        </>
    );
}
