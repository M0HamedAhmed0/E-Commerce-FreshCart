import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";
import toast from "react-hot-toast";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    const yupSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name Is Required")
            .min(5, "Name Min Length is 5")
            .max(20, "Name Must Be at Most 20 Characters"),
        email: Yup.string().email().required("Email Is Required"),
        password: Yup.string()
            .required("Password Is Required")
            .matches(
                /^[A-Za-z][A-Za-z0-9]{5,8}$/,
                `must be\n* Start with a letter (either uppercase or lowercase).\n* Be between 6 and 9 characters in total.\n* Can only contain letters (A-Z or a-z) and numbers (0-9).`
            ),
        rePassword: Yup.string()
            .required("RePassword Is Required")
            .oneOf([Yup.ref("password")], "Password Not Matches"),
        phone: Yup.string()
            .required("Phone Is Required")
            .matches(/^01[0125][0-9]{8}$/gm, "Invalid Phone Number"),
    });

    async function handleSubmit(values) {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signup",
                values
            );
            console.log(data);
            toast.success("Added A New User Successfully", {
                position: "top-right",
                style: {
                    background: "#4fa74f",
                    fontSize: "20px",
                    color: "#fff",
                    padding: "15px",
                },
            });
            navigate("/");
        } catch (error) {
            setErrorMsg(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        onSubmit: handleSubmit,
        validationSchema: yupSchema,
    });

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Register</title>
                </Helmet>
            </HelmetProvider>
            <form
                onSubmit={formik.handleSubmit}
                className="container max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto mt-16 px-5 md:px-0"
            >
                <h2 className=" text-4xl font-normal text-black my-5">
                    Register Now
                </h2>
                {errorMsg && (
                    <div
                        className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800"
                        role="alert"
                    >
                        Account Already Exists
                    </div>
                )}
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Name :
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:border-none focus:ring-4 focus:ring-blue-500/50  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    />
                    {formik.errors.name && formik.touched.name && (
                        <div
                            className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800"
                            role="alert"
                        >
                            {formik.errors.name}
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Email :
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="userEmail"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:border-none focus:ring-4 focus:ring-blue-500/50  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div
                            className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800"
                            role="alert"
                        >
                            {formik.errors.email}
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Password :
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:border-none focus:ring-4 focus:ring-blue-500/50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div
                            className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800 whitespace-pre-wrap"
                            role="alert"
                        >
                            {formik.errors.password}
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="rePassword"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Re-Password :
                    </label>
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:border-none focus:ring-4 focus:ring-blue-500/50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    />
                    {formik.errors.rePassword && formik.touched.rePassword && (
                        <div
                            className="p-4 my-4 text-sm text-red-600 rounded-lg bg-[#f8d7da] border border-[#f1aeb5] dark:bg-gray-800 dark:text-red-800"
                            role="alert"
                        >
                            {formik.errors.rePassword}
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Phone :
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:border-none focus:ring-4 focus:ring-blue-500/50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
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
                <div className="flex items-center mb-5 justify-end w-fit ms-auto">
                    <button
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty || isLoading}
                        className="btn-green disabled:bg-transparent disabled:border disabled:border-gray-500 disabled:text-gray-600"
                    >
                        {isLoading ? (
                            <i className="fa-solid fa-spinner fa-spin fa-xl" />
                        ) : (
                            "Register Now"
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
