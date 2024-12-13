import axios from "axios";
import { useEffect, useState } from "react";

export default function AllOrders() {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    async function getAllOrders() {
        setIsLoading(true);
        const cartItem = localStorage.getItem("cartItem");
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${cartItem}`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setOrders(data);
            console.log("Orders Data:", data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <div className="container sm:max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto py-4 md:px-0 my-10 bg-slate-50 border-gray-200 rounded-lg">
            <div className="cart p-5 lg:p-10 w-full">
                <h1 className="text-4xl font-bold mb-5">All Orders</h1>

                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-700"></i>
                    </div>
                ) : orders.length === 0 ? (
                    <p className="text-lg font-medium text-center text-red-500">
                        No Orders Found or an Error Occurred.
                    </p>
                ) : (
                    <>
                        {orders.map((order) => (
                            <div key={order._id} className="mb-5">
                                <h2 className="text-xl font-bold">
                                    Total Price:{" "}
                                    <span className="text-[#22db14] pl-1">
                                        {order.totalOrderPrice} EGP
                                    </span>
                                </h2>
                            </div>
                        ))}

                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-left text-gray-700 border-collapse">
                                <thead className="bg-gray-100 text-sm uppercase text-center">
                                    <tr>
                                        <th className="px-4 py-2">Image</th>
                                        <th className="px-4 py-2">Product</th>
                                        <th className="px-4 py-2">Count</th>
                                        <th className="px-4 py-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) =>
                                        order.cartItems.map((item, index) => (
                                            <tr
                                                key={`${item._id}-${index}`}
                                                className="border-b hover:bg-white"
                                            >
                                                <td className="px-4 py-2 w-1/6">
                                                    <img
                                                        src={
                                                            item.product
                                                                ?.imageCover
                                                        }
                                                        alt={
                                                            item.product?.title
                                                        }
                                                        className="w-full h-auto"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-center text-lg">
                                                    {item.product?.title}
                                                </td>
                                                <td className="px-4 py-2 text-center text-lg">
                                                    {item.count}
                                                </td>
                                                <td className="px-4 py-2 text-center text-[#22db14] text-lg">
                                                    {item.price} EGP
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
