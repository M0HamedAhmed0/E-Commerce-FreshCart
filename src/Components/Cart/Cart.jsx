import { Helmet, HelmetProvider } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CounterContext } from "../Context/CounterContext";

export default function Cart() {
    const [isLoading, setIsLoading] = useState(false);
    const [cartData, setCartData] = useState(null);
    const { setCountItem } = useContext(CounterContext);
    const navigate = useNavigate();

    async function getAllCart() {
        try {
            setIsLoading(true);
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/cart",
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setCartData(data?.data || null);
            setCountItem(data.numOfCartItems || 0);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateCount(id, count) {
        try {
            setIsLoading(true);
            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    count: count,
                },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setIsLoading(true);
            toast.success("Updated Cart Item Successfully", {
                position: "top-right",
                style: {
                    background: "#4fa74f",
                    fontSize: "20px",
                    color: "#fff",
                    padding: "15px",
                },
            });
            setCartData(data.data);
            setCountItem(data.numOfCartItems || 0);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteItem(id) {
        try {
            setIsLoading(true);
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setCartData(data?.data);
            toast.success(" 🗑 Remove The Product From The Cart Successfully", {
                position: "top-right",
                style: {
                    background: "#4fa74f",
                    fontSize: "20px",
                    color: "#fff",
                    padding: "15px",
                },
            });
            setCountItem(data.numOfCartItems || 0);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function clearCart() {
        try {
            setIsLoading(true);
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setIsLoading(true);
            toast.success(" 🗑 Clear Cart Successfully", {
                position: "top-right",
                style: {
                    background: "#4fa74f",
                    fontSize: "20px",
                    color: "#fff",
                    padding: "15px",
                },
            });
            setCartData(null);
            setCountItem(data.numOfCartItems || 0);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllCart();
    }, []);

    if (!cartData) {
        return (
            <>
                <div className="container sm:max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-between py-4 md:px-0 my-10 bg-slate-50 border-gray-200 rounded-lg">
                    <div className="cart p-5 lg:p-8 w-full">
                        <div className="flex flex-col mb-6">
                            <h1 className="text-[32px] font-medium ">
                                Cart Shop
                            </h1>
                            <h1 className="text-2xl font-medium mt-6">
                                Your Cart Is Empty
                            </h1>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Cart</title>
                </Helmet>
            </HelmetProvider>
            <section>
                <div className="container sm:max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-between py-4 md:px-0 my-10 bg-slate-50 border-gray-200 rounded-lg">
                    <div className="cart p-5 lg:p-10 w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-[32px] font-medium">
                                Cart Shop
                            </h1>
                            <button
                                onClick={() =>
                                    navigate("/checkout/" + cartData._id)
                                }
                                className="text-white text-[18px] font-medium ml-5 bg-blue-500 hover:bg-blue-700 transition p-3 rounded-lg"
                            >
                                Check Out
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl text-black font-medium">
                                Total Price:
                                <span className="text-[#22db14] pl-1">
                                    {cartData.totalCartPrice || 0} EGP
                                </span>
                            </h3>
                            <h3 className="text-xl text-black font-medium">
                                Total Number Of Items:
                                <span className="text-[#22db14] pl-1">
                                    {cartData.products?.length || 0}
                                </span>
                            </h3>
                        </div>

                        {cartData.products.length === 0
                            ? null
                            : cartData.products.map((item, index) => (
                                  <div
                                      key={item._id || index}
                                      className="relative overflow-x-auto py-8 border-b"
                                  >
                                      <div className="row flex flex-col md:flex-row items-center">
                                          <div className="md:w-1/6">
                                              <img
                                                  src={item.product.imageCover}
                                                  alt={item.product.title}
                                              />
                                          </div>
                                          <div className="md:ml-5 w-full mt-4 md:mt-0 flex justify-between items-center md:flex-row">
                                              <div className="content w-full">
                                                  <h2 className="text-xl text-black font-medium mt-1">
                                                      {item.product.title}
                                                  </h2>
                                                  <h3 className="text-base font-medium mt-1">
                                                      {item.price} EGP
                                                  </h3>
                                                  <button
                                                      onClick={() =>
                                                          deleteItem(
                                                              item.product.id
                                                          )
                                                      }
                                                      className="text-red-500 text-sm font-normal mt-1"
                                                  >
                                                      <i className="fa-solid fa-trash pr-1" />
                                                      Remove
                                                  </button>
                                              </div>
                                              <div className="lg:pl-20 xl:pl-72 2xl:pl-96 mt-3 md:mt-0 flex items-center justify-between">
                                                  <button
                                                      onClick={() =>
                                                          updateCount(
                                                              item.product.id,
                                                              item.count + 1
                                                          )
                                                      }
                                                      className="px-3 md:px-3 py-1 active:border-gray-500 text-xl font-normal text-black border border-[#22db14] rounded-lg"
                                                  >
                                                      +
                                                  </button>
                                                  <span className="text-lg font-medium mx-3">
                                                      {item.count}
                                                  </span>
                                                  <button
                                                      onClick={() =>
                                                          updateCount(
                                                              item.product.id,
                                                              item.count - 1
                                                          )
                                                      }
                                                      className="px-3 md:px-3 py-1 active:border-gray-500 text-xl font-normal text-black border border-[#22db14] rounded-lg"
                                                  >
                                                      -
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                    </div>
                    <button
                        onClick={clearCart}
                        className="px-14 md:px-3 py-2 active:border-gray-500 text-xl font-normal text-black border border-[#22db14] rounded-lg mx-auto"
                    >
                        Clear Your Cart
                    </button>
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
