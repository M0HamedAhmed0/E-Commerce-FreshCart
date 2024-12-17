import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function AllOrders() {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    function getUserId() {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) return null;

        try {
            const decoded = jwtDecode(userToken);
            return decoded.id;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    async function fetchAllOrders() {
        const userId = getUserId();
        if (!userId) return;
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            setOrders(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="container sm:max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto p-4 md:px-0 my-28 bg-slate-50 border-gray-200 rounded-lg">
            <div className="p-5 lg:p-10 w-full">
                <h1 className="text-4xl font-bold mb-5 text-center">
                    All Orders
                </h1>

                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-700"></i>
                    </div>
                ) : orders.length === 0 ? (
                    <p className="text-lg font-medium text-center text-red-500">
                        Do Not Have Any Orders
                    </p>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="border p-4 mb-6 bg-white rounded-lg shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Total Price:
                                    <span className="text-green-600">
                                        {order.totalOrderPrice} EGP
                                    </span>
                                </h2>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Order Date:
                                    <span className="text-green-600">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("en-GB")}
                                    </span>
                                </h2>
                            </div>
                            <table className="w-full text-center text-sm text-gray-500">
                                <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="px-4 py-2">Image</th>
                                        <th className="px-4 py-2">
                                            Product Name
                                        </th>
                                        <th className="px-4 py-2">Count</th>
                                        <th className="px-4 py-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.cartItems.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="bg-white border-b hover:bg-gray-50"
                                        >
                                            <td className="p-4 flex justify-center w-4/5">
                                                <img
                                                    src={
                                                        item.product.imageCover
                                                    }
                                                    alt={item.product.title}
                                                    className="h-40 object-cover rounded-md"
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-gray-900">
                                                {item.product.title
                                                    .split(" ", 3)
                                                    .join(" ")}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.count}
                                            </td>
                                            <td className="px-4 py-2 text-green-600 font-bold">
                                                {item.price} EGP
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
