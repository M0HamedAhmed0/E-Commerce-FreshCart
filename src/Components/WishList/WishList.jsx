import { Helmet, HelmetProvider } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CounterContext } from "../Context/CounterContext";

export default function WishList() {
    const [isLoading, setIsLoading] = useState(false);
    const [wishList, setWishList] = useState([]);
    const { token, userToken } = useContext(UserContext);
    const { setCountItem } = useContext(CounterContext);
    const navigate = useNavigate();

    async function getWishList() {
        try {
            setIsLoading(true);
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setWishList(data.data);
        } catch (error) {
            console.error("Error fetching wish list:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function removeItemFromWishList(itemId) {
        try {
            setIsLoading(true);
            await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            toast("Item Removed From Wish List Successfully!", {
                icon: "💔",
                position: "top-right",
                style: {
                    background: "#4fa74f",
                    fontSize: "20px",
                    color: "#fff",
                },
            });
            setWishList((prevWishList) =>
                prevWishList.filter((item) => item.id !== itemId)
            );
            setIsLoading(false);
        } catch (error) {
            console.error("Error removing item from wish list:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function addToCart(itemId) {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: itemId },
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
            toast.error(
                "Error adding item to cart. Please try again later." + error
            );
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!token && !userToken) {
            console.error("Token is missing. Redirecting to login page.");
            navigate("/login");
        } else {
            getWishList();
        }
    }, [token, userToken]);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Wish List</title>
                </Helmet>
            </HelmetProvider>

            <section>
                <div className="container max-w-[400px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-between py-4 md:px-0 my-10 bg-slate-50 border-gray-200 rounded-lg">
                    <div className="wishList p-5 lg:p-10 w-full">
                        <h1 className="text-[32px] font-medium text-[#212529]">
                            My Wish List
                        </h1>
                        {wishList.length === 0 ? (
                            <p className="text-center text-lg font-medium text-[#4fa74f]">
                                You Have No Items on Your Wish List.
                            </p>
                        ) : (
                            wishList.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="relative overflow-x-auto py-8 border-b"
                                >
                                    <div className="row flex flex-col md:flex-row items-center">
                                        <div className="md:w-1/6">
                                            <img
                                                src={item.imageCover}
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="w-full md:ml-5 mt-4 md:mt-0 flex justify-between flex-col md:flex-row">
                                            <div className="content">
                                                <h2 className="text-xl text-black font-medium mt-1">
                                                    {item.title}
                                                </h2>
                                                <h3 className="text-green-500 text-base font-medium mt-1">
                                                    {item.price} EGP
                                                </h3>
                                                <button
                                                    onClick={() =>
                                                        removeItemFromWishList(
                                                            item.id
                                                        )
                                                    }
                                                    className="text-red-500 text-sm font-normal mt-1"
                                                >
                                                    <i className="fa-solid fa-trash pr-1" />
                                                    Remove
                                                </button>
                                            </div>
                                            <div className=" mt-3 md:mt-0 mx-auto md:mx-0">
                                                <button
                                                    onClick={() =>
                                                        addToCart(item.id)
                                                    }
                                                    className="px-14 md:px-3 py-2 active:border-gray-500 text-xl font-normal text-black border border-green-300 rounded-lg"
                                                >
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

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
