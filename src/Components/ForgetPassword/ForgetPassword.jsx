import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        const emailValue = formik.values.email;
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                {
                    email: emailValue,
                }
            );
            console.log(data);
            navigate("/verifyCode");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Forget Password</title>
                </Helmet>
            </HelmetProvider>
            <form
                onSubmit={formik.handleSubmit}
                className="container max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto mt-32 px-5 md:px-0"
            >
                <h2 className="text-4xl font-normal text-black my-5">
                    Please Enter Your Email
                </h2>
                <div className="mb-5">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-4 focus:ring-blue-500/50 block w-full p-2.5"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800">
                            {formik.errors.email}
                        </p>
                    )}
                </div>
                <div className="flex items-center mb-5 justify-start ms-auto">
                    <button
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty || isLoading}
                        className="btn-green hover:bg-transparent border hover:text-green-500 hover:border-green-600 disabled:bg-transparent disabled:border disabled:border-gray-500 disabled:text-gray-600"
                    >
                        {isLoading ? (
                            <i className="fa-solid fa-spinner fa-spin fa-xl" />
                        ) : (
                            "Verify"
                        )}
                        {isLoading && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
                                <div className="h-16 w-16">
                                    <i className="fa-solid fa-spinner fa-spin text-7xl text-white" />
                                </div>
                            </div>
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
