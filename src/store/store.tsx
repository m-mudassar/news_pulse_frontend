import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import {reducers} from "./reducers";
import rootSaga from "./sagas/rootSaga.tsx";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware:any) => getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
