import axios from "axios";
import { useEffect, useState } from "react";

export default function SubCategories({ categoryId, categoryName }) {
    const [subcategories, setSubcategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getSubcategories(id) {
        try {
            setIsLoading(true);
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
            );
            setSubcategories(data.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (categoryId) {
            getSubcategories(categoryId);
        }
    }, [categoryId]);

    return (
        <>
            {subcategories.length > 0 && (
                <section>
                    <div className="container max-w-[360px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-wrap items-center justify-between py-4 md:px-0">
                        <div className="flex flex-col w-full">
                            <h2 className="title text-center p-4 text-[#198754] font-medium text-[28px]">
                                {categoryName} Subcategories
                            </h2>
                            <div className="row grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 my-5">
                                {subcategories.map((subcategory) => (
                                    <div key={subcategory._id}>
                                        <div className="nameCard text-center m-auto card border rounded-md transition duration-500 hover:shadow-shadow-green hover:scale-110">
                                            <h2 className="p-4 text-black font-medium text-[28px]">
                                                {subcategory.name}
                                            </h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {!isLoading && subcategories.length === 0 && (
                <div className="text-center py-10">
                    <div
                        className="flex items-center justify-center p-4 mb-4 text-xl text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                        role="alert"
                    >
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 me-3 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div>
                            <span className="font-medium">
                                No SubCategories Available.
                            </span>
                        </div>
                    </div>
                </div>
            )}

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
