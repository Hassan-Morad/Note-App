import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { token } = useContext(UserContext);
    if (token) {
        return children;
    }
    return <Navigate to="/login" />;
}
