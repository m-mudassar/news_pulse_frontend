import {PROTECTED_ROUTES_PATH, PUBLIC_ROUTES_PATH} from "./RoutePaths.tsx";
import {createElement, lazy} from "react";


const Login = lazy(() =>
    import("../pages/auth/Login/Login.tsx")
);

const Register = lazy(() =>
    import("../pages/auth/Register/Register.tsx")
);

const Home = lazy(() =>
    import("../pages/Home/Home.tsx")
);
export const PUBLIC_ROUTES = [
    {path: PUBLIC_ROUTES_PATH.PUBLIC_HOME, element: createElement(Login)},
    {path: PUBLIC_ROUTES_PATH.LOGIN, element: createElement(Login)},
    {path: PUBLIC_ROUTES_PATH.REGISTER, element: createElement(Register)},

];

export const PROTECTED_ROUTES = [
    {path: PROTECTED_ROUTES_PATH.HOME, element: createElement(Home)},
];