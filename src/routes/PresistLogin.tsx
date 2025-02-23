import { Outlet, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader/Loader.jsx";
import { isEmpty } from "../helpers/utils.js";
import {ActionTypes} from "../store/ActionTypes.tsx";
import {selectAuthUser, selectIsRefreshingToken} from "../store/modules/auth/login/loginSelectors.tsx";

const PersistLogin = () => {
    const [initialCheck, setInitialCheck] = useState(true);

    const isRefreshingToken = useSelector(selectIsRefreshingToken);
    const user = useSelector(selectAuthUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refreshTimeoutRef = useRef(0);


    useEffect(() => {
        const verifyToken = async () => {
            if (isEmpty(user)) {
                dispatch({
                    type: ActionTypes.REFRESH_TOKEN,
                    payload: { navigate: navigate },
                });
            }
            setInitialCheck(false);
        };

        verifyToken();
    }, []);

    useEffect(() => {
        if (user?.access_token) {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            const expiresIn = user.expires_in || 3600;
            const refreshTime = (expiresIn - 300) * 1000;

            refreshTimeoutRef.current = setTimeout(() => {
                dispatch({ type: ActionTypes.REFRESH_TOKEN, payload: { navigate } });
            }, refreshTime);

            return () => clearTimeout(refreshTimeoutRef.current);
        }
    }, [user?.access_token]);

    if (initialCheck || isRefreshingToken) {
        return <Loader />;
    }

    return <Outlet />;
};

export default PersistLogin;
