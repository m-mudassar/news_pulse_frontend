import {call, put, takeLatest} from "redux-saga/effects";
import {ActionTypes} from "../../../ActionTypes.tsx";
import {apiService} from "../../../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../../../helpers/ApiEndpoints.tsx";
import {registerFailure, registerSuccess, startRegister} from "./registerSlice.tsx";
import {PUBLIC_ROUTES_PATH} from "../../../../routes/RoutePaths.tsx";
import {showSnackbar} from "../../ui-triggers/snackbar/snackbarSlice.tsx";
import {SNACKBAR_TYPES} from "../../../../helpers/constants.tsx";

interface RegisterResponse {
    success: boolean;
    message: string;
    data: any;
}

function* register(action: any) {
    try {
        yield put(startRegister());
        const registerApi = (credentials: any) => apiService.post(ApiEndpoints.REGISTER, credentials);
        const resp: RegisterResponse = yield call(registerApi, action.payload.formData);
        yield put(registerSuccess());
        yield put(showSnackbar({
            message: resp?.message || "Registration success.",
            severity: SNACKBAR_TYPES.SUCCESS
        }));
        action.payload.navigate(PUBLIC_ROUTES_PATH.LOGIN);
    } catch (error: any) {
        yield put(registerFailure(error.message));
        yield put(showSnackbar({
            message: error.response.data.error || "Registration failed",
            severity: SNACKBAR_TYPES.ERROR
        }));

    }
}

export function* registerSaga() {
    yield takeLatest(ActionTypes.REGISTER, register);
}
