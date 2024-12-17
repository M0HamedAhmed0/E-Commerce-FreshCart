import axios from "axios";
import { useFormik } from "formik";
import { useState, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../Context/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useContext(UserContext);

    async function handleSubmit(values) {
        setErrorMsg("");
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signin",
                values
            );
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userEmail", values.email);
            setToken(data.token);
            navigate("/home");
        } catch (error) {
            console.error(error);
            setErrorMsg(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(12, "Password cannot exceed 12 characters"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Login</title>
                </Helmet>
            </HelmetProvider>
            <form
                onSubmit={formik.handleSubmit}
                className="container max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto mt-32 px-5 md:px-0"
            >
                <h2 className="text-4xl font-normal text-black my-5">
                    Login Now
                </h2>
                {errorMsg && (
                    <div
                        className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5]"
                        role="alert"
                    >
                        {errorMsg}
                    </div>
                )}
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-base font-medium text-gray-900"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="userEmail"
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
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-base font-medium text-gray-900"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-4 focus:ring-blue-500/50 block w-full p-2.5"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800">
                            {formik.errors.password}
                        </p>
                    )}
                </div>
                <div className="flex items-center mb-5 justify-between">
                    <div>
                        <Link
                            to={"/forgetPassword"}
                            className="text-xl font-semibold text-black transition-colors hover:text-[#4fa74f] cursor-pointer"
                        >
                            forget your password ?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty || isLoading}
                        className="btn-green w-fit ms-auto disabled:bg-transparent disabled:border disabled:border-gray-500 disabled:text-gray-600"
                    >
                        {isLoading ? (
                            <i className="fa-solid fa-spinner fa-spin fa-xl" />
                        ) : (
                            "Login Now"
                        )}
                    </button>
                </div>
            </form>
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <i className="fa-solid fa-spinner fa-spin text-7xl text-white" />
                </div>
            )}
        </>
    );
}
