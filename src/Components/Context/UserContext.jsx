import PropTypes from "prop-types";
import { createContext, useState } from "react";

const UserContext = createContext();

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function UserContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("userToken"));
    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext };
