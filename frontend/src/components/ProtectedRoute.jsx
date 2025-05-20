import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import MyStore from "../MyStore";

const ProtectedRoute = ({ Component }) => {
    const {isLoggedIn} = useContext(MyStore)
    return <div>{isLoggedIn ? <Component /> : <Navigate to="/login" />}</div>;
}
export default ProtectedRoute