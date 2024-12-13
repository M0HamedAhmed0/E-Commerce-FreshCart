import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getAllBrands() {
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/brands"
            );
            setBrands(data.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching brands:", error);
            setIsLoading(false);
        }
    }

    const showModal = (brand) => {
        setIsLoading(true);
        setTimeout(() => {
            setSelectedBrand(brand);
            setIsModalVisible(true);
            setIsLoading(false);
        }, 500);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setSelectedBrand(null);
    };

    useEffect(() => {
        getAllBrands();
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Brands</title>
                </Helmet>
            </HelmetProvider>
            <section>
                <div className="container max-w-[400px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-between py-4 md:px-0">
                    <h1 className="m-auto text-[40px] font-medium text-[#4fa74f]">
                        All Brands
                    </h1>
                    <div className="row grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-12 w-full">
                        {brands.map((brand) => (
                            <div
                                key={brand._id}
                                onClick={() => showModal(brand)}
                                className="cardBrands border rounded-md transition duration-500 hover:shadow-shadow-green hover:scale-110 cursor-pointer"
                            >
                                <div className="imgCard w-full">
                                    <img src={brand.image} alt={brand.name} />
                                </div>
                                <div className="nameCard text-center py-5">
                                    <h2>{brand.name}</h2>
                                </div>
                            </div>
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
            {isModalVisible && (
                <div
                    onClick={hideModal}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                    <div className="absolute top-5 bg-white rounded-lg shadow-lg p-6 animate-slide-down">
                        <div className="flex justify-end items-center border-b pb-2">
                            <button
                                onClick={hideModal}
                                className="text-gray-400 text-xl hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="border-b flex justify-between items-center">
                            <div className="nameBrans">
                                <h2 className="text-[40px] font-medium  text-green-500">
                                    {selectedBrand?.name}
                                </h2>
                                <p className="text-gray-600 mb-2">
                                    {selectedBrand?.name}
                                </p>
                            </div>
                            <div className="imageBrands">
                                <img
                                    src={selectedBrand?.image}
                                    alt={selectedBrand?.name}
                                    className="rounded"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={hideModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded transition-all hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
