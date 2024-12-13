import { useFormik } from "formik";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

export default function CheckOut() {
    const [isLoading, setIsLoading] = useState(true);
    const param = useParams();
    setTimeout(() => {
        setIsLoading(false);
    }, 1000);

    const yupSchema = Yup.object().shape({
        details: Yup.string()
            .required("Details Is Required")
            .min(3, "Details Min Length is 3")
            .max(20, "Details Must Be at Most 20 Characters"),
        city: Yup.string()
            .required("City Is Required")
            .min(3, "City Min Length is 3")
            .max(20, "City Must Be at Most 20 Characters"),
        phone: Yup.string()
            .required("Phone Is Required")
            .matches(/^01[0125][0-9]{8}$/gm, "Invalid Phone Number"),
    });

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: () => handleSubmit(formik.values),
        validationSchema: yupSchema,
    });

    async function handleSubmit(values) {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${param.id}?url=http://localhost:5173`,
                { shippingAddress: values },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            const checkOutUrl = data.session.url;
            setTimeout(() => {
                window.location.href = checkOutUrl;
            }, 1000);
            toast.success(" 🏃‍♂️ Pay Now", {
                style: {
                    background: "#4fa74f",
                    fontSize: "20px",
                    color: "#fff",
                    padding: "15px",
                },
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to complete checkout. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Check Out</title>
                </Helmet>
            </HelmetProvider>
            <form
                onSubmit={formik.handleSubmit}
                className="container max-w-[400px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto mt-16"
            >
                <div className="mb-5">
                    <label
                        htmlFor="details"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Details:
                    </label>
                    <input
                        type="text"
                        id="details"
                        name="details"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.details}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:border-none focus:ring-4 focus:ring-blue-500/50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {formik.errors.details && formik.touched.details && (
                        <div
                            className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800"
                            role="alert"
                        >
                            {formik.errors.details}
                        </div>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Phone:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:border-none focus:ring-4 focus:ring-blue-500/50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {formik.errors.phone && formik.touched.phone && (
                        <div
                            className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800"
                            role="alert"
                        >
                            {formik.errors.phone}
                        </div>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="city"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:border-none focus:ring-4 focus:ring-blue-500/50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {formik.errors.city && formik.touched.city && (
                        <div
                            className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800"
                            role="alert"
                        >
                            {formik.errors.city}
                        </div>
                    )}
                </div>

                <div className="flex items-center my-8 justify-end ms-auto">
                    <button
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty || isLoading}
                        className="btn-sky w-full disabled:bg-transparent disabled:border disabled:border-[#0dcaf0] disabled:text-[#0dcaf0]"
                    >
                        {isLoading ? (
                            <i className="fa-solid fa-spinner fa-spin fa-xl" />
                        ) : (
                            "Pay Now"
                        )}
                    </button>
                </div>
            </form>
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="h-16 w-16">
                        <i className="fa-solid fa-spinner fa-spin text-7xl text-white" />
                    </div>
                </div>
            )}
        </>
    );
}
