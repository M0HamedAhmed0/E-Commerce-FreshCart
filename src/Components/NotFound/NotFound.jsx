import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function NotFound() {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Not Found Page</title>
                </Helmet>
            </HelmetProvider>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-9xl font-bold text-green-500 mb-6">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    to="/home"
                    className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
                >
                    Go Back to Home
                </Link>
            </div>
        </>
    );
}
