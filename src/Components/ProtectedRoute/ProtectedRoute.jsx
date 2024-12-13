import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function ProtectedRoute({ children }) {
    if (localStorage.getItem("userToken") == null) {
        return <Navigate to={"/"}></Navigate>;
    } else {
        return children;
    }
}
