import {Suspense} from "react";
import {Route, Routes} from "react-router";
import {NotFound} from "../components/NotFound/NotFound.tsx";
import {PROTECTED_ROUTES, PUBLIC_ROUTES} from "./AllRoutes.tsx";
import PersistLogin from "./PresistLogin.tsx";


export const AppRoutes = () => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>

                {PUBLIC_ROUTES.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}/>
                ))}


                <Route element={<PersistLogin/>}>
                    {PROTECTED_ROUTES.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))}
                </Route>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
};