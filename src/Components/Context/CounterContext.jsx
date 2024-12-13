import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CounterContext = createContext();

CounterContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function CounterContextProvider({ children }) {
    const [countItem, setCountItem] = useState(0);

    async function getAllCart() {
        const token = localStorage.getItem("userToken");
        if (!token) {
            console.warn("No token found in localStorage.");
            return;
        }
        try {
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/cart",
                {
                    headers: {
                        token,
                    },
                }
            );
            setCountItem(data.numOfCartItems);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    }
    useEffect(() => {
        getAllCart();
    }, []);

    return (
        <CounterContext.Provider value={{ countItem, setCountItem }}>
            {children}
        </CounterContext.Provider>
    );
}

export { CounterContext };
