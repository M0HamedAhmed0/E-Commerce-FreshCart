import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { CounterContext } from "../Context/CounterContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { token, setToken } = useContext(UserContext);
    const { countItem } = useContext(CounterContext);

    function logOut() {
        localStorage.removeItem("userToken");
        localStorage.removeItem("likedProducts");
        setToken(null);
        navigate("/");
    }

    return (
        <nav className="bg-slate-50 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
            <div className="container sm:max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-between p-4 md:px-0">
                <NavLink
                    to="/home"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <i className="fa-solid fa-cart-shopping text-[#4fa74f] text-3xl" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Fresh Cart
                    </span>
                </NavLink>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-label="Toggle navigation"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                        aria-hidden="true"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className="hidden w-full md:flex md:w-auto gap-5 md:flex-grow md:justify-evenly"
                    id="navbar-default"
                >
                    {token && (
                        <>
                            <ul className="font-normal ms-auto text-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <NavLink
                                        to="/home"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/cart"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Cart
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/wishList"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Wish List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/products"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/categories"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Categories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/brands"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Brands
                                    </NavLink>
                                </li>
                            </ul>
                            <ul className="font-normal ms-auto text-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li className="relative">
                                    <NavLink
                                        to="/cart"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        <i className="fa-solid fa-cart-shopping text-3xl" />
                                        <div className="bg-[#4fa74f] text-white px-[5px] rounded dark:bg-blue-900 dark:text-blue-300 absolute top-0 right-[45%] md:right-0">
                                            {countItem}
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <span
                                        onClick={logOut}
                                        className="block p-3 md:p-2 cursor-pointer rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 transition-opacity"
                                    >
                                        Log out
                                    </span>
                                </li>
                            </ul>
                        </>
                    )}
                    {!token && (
                        <>
                            <ul className="font-medium ms-auto text-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <NavLink
                                        to="/register"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/"
                                        className="block p-3 md:p-2 opacity-65 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:opacity-80 transition-opacity dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
