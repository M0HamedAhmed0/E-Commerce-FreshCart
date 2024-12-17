import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CounterContext } from "../Context/CounterContext";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchItem, setSearchItem] = useState([]);
    const { setCountItem } = useContext(CounterContext);

    const [likedStates, setLikedStates] = useState(() => {
        const saved = localStorage.getItem("likedProducts");
        return saved ? JSON.parse(saved) : {};
    });

    async function getProducts() {
        try {
            setIsLoading(true);
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/products"
            );
            setProducts(data.data);
            setSearchItem(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

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
                    padding: "15px",
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
                    padding: "15px",
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

    function searchProduct(e) {
        const searchTitle = e.toLowerCase();
        if (searchTitle == "") {
            setSearchItem(products);
        } else {
            const filteredProducts = products.filter((product) =>
                product.title.toLowerCase().includes(searchTitle)
            );
            setSearchItem(filteredProducts);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Products</title>
                </Helmet>
            </HelmetProvider>

            <section>
                <div className="container sm:max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-between p-4 md:px-0 mt-20">
                    <form className="w-4/5 mx-auto my-8">
                        <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                onInput={(e) => searchProduct(e.target.value)}
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-none focus:ring-4 focus:ring-blue-500/50 "
                                placeholder="Search ..."
                                required
                            />
                        </div>
                    </form>
                    <div className="row grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12 my-12 m-auto">
                        {products.length == 0
                            ? null
                            : searchItem.map((product, index) => (
                                  <Link
                                      to={"/productDetails/" + product.id}
                                      key={product.id || index}
                                      className="card max-h-fit w-full relative z-20 overflow-hidden hover:overflow-visible max-w-sm bg-white hover:border transition border-gray-200 rounded-lg duration-500 hover:shadow-shadow-green hover:scale-110"
                                  >
                                      <div>
                                          <img
                                              className="p-1 rounded-xl"
                                              src={product.imageCover}
                                              alt="product image"
                                          />
                                      </div>
                                      <div className="px-5 pb-5">
                                          <div className="max-w-[95%]">
                                              <h5 className="text-base text-[#4fa74f] tracking-tight dark:text-white">
                                                  {product.category.name}
                                              </h5>
                                              <h5 className="text-base pt-2 font-medium tracking-tight dark:text-white">
                                                  {product.title}
                                              </h5>
                                          </div>
                                          <div className="flex items-center justify-end mb-3">
                                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                  <svg
                                                      className="w-4 h-4 text-yellow-300"
                                                      aria-hidden="true"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="currentColor"
                                                      viewBox="0 0 22 20"
                                                  >
                                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                  </svg>
                                                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                                      {product.ratingsAverage}
                                                  </span>
                                              </div>
                                          </div>
                                          <div className="flex items-center justify-between mb-2">
                                              <span className="text-xl font-medium text-gray-900 dark:text-white">
                                                  {product.price} EGP
                                              </span>
                                              <i
                                                  onClick={(e) =>
                                                      addProductToWishList(
                                                          e,
                                                          product.id
                                                      )
                                                  }
                                                  className={`fa-solid fa-heart text-2xl transition-colors cursor-pointer ${
                                                      likedStates[product.id]
                                                          ? "text-red-600"
                                                          : "text-stone-700 hover:text-red-600"
                                                  }`}
                                              />
                                          </div>
                                          <button
                                              onClick={(e) =>
                                                  addProduct(e, product.id)
                                              }
                                              className="btn-up translate-y-80 opacity-0 duration-500 transition-all m-auto w-full btn-green"
                                          >
                                              + Add to cart
                                          </button>
                                      </div>
                                  </Link>
                              ))}
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
