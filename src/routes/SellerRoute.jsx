import PropTypes from "prop-types";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";

const SellerRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  if (role === "Seller") return children;

  return <Navigate to="/dashboard" replace="true" />;
};

SellerRoute.propTypes = {
  children: PropTypes.element,
};

export default SellerRoute;
