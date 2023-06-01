import React, {useContext} from 'react';
import { Navigate } from "react-router-dom";
import {AppContext} from "../contexts/AppContext";

export default function ProtectedRoute({ element: Component, ...props }) {
	const { loggedIn } = useContext(AppContext)
	
	return loggedIn ? <Component {...props}/> : <Navigate to='/sign-in' replace/>
	;
};