import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SubCategories from "../SubCategories/SubCategories";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getAllCategories() {
        try {
            setIsLoading(true);
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/categories"
            );
            setCategories(data.data);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Categories</title>
                </Helmet>
            </HelmetProvider>
            <section>
                <div className="container sm:max-w-[600px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-between py-28 md:px-0">
                    <div className="row grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 my-5 m-auto md:w-full">
                        {categories.map((item) => (
                            <div
                                key={item._id}
                                onClick={() =>
                                    setSelectedCategory({
                                        id: item._id,
                                        name: item.name,
                                    })
                                }
                                className="card border rounded-md transition duration-500 hover:shadow-shadow-green hover:scale-110 cursor-pointer"
                            >
                                <div className="imgCard">
                                    <img
                                        src={item.image}
                                        className="object-cover w-full h-[300px]"
                                        alt={item.name}
                                    />
                                </div>
                                <div className="nameCard text-center">
                                    <h2 className="p-4 text-[#198754] font-medium text-[28px]">
                                        {item.name}
                                    </h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="h-16 w-16">
                        <i className="fa-solid fa-spinner fa-spin text-7xl text-white" />
                    </div>
                </div>
            )}

            {selectedCategory && (
                <SubCategories
                    categoryId={selectedCategory.id}
                    categoryName={selectedCategory.name}
                />
            )}
        </>
    );
}
