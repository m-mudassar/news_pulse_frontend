import { call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import { ActionTypes } from "../../../ActionTypes.tsx";
import { apiService } from "../../../../helpers/api/ApiService.tsx";
import { ApiEndpoints } from "../../../../helpers/ApiEndpoints.tsx";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout, refreshTokenSuccess, startRefreshingToken,
} from "./loginSlice.tsx";
import {
  PROTECTED_ROUTES_PATH,
  PUBLIC_ROUTES_PATH,
} from "../../../../routes/RoutePaths.tsx";
import {selectIsRefreshingToken} from "./loginSelectors.tsx";
import {showSnackbar} from "../../ui-triggers/snackbar/snackbarSlice.tsx";
import {SNACKBAR_TYPES} from "../../../../helpers/constants.tsx";

interface LoginResponse {
  name: string;
  email: string;
  access_token: string;
  token_type: string;
  expires_in: number;
}

function* login(action: any) {
  try {
    yield put(loginRequest());
    const loginApi = (credentials: any) =>
      apiService.post(ApiEndpoints.LOGIN, credentials);
    const response: LoginResponse = yield call(
      loginApi,
      action.payload.formData,
    );
    yield put(loginSuccess(response));
    action.payload.navigate(PROTECTED_ROUTES_PATH.HOME);
  } catch (error: any) {
    yield put(loginFailure(error.message));
    yield put(showSnackbar({
      message: error.response.data.message || "Login failed.",
      severity: SNACKBAR_TYPES.ERROR
    }));
  }
}

export function* loginSaga() {
  yield takeLatest(ActionTypes.LOGIN, login);
}
function* refreshToken(action: any) {
  try {
    const isRefreshingToken:boolean = yield select(selectIsRefreshingToken);
    if(isRefreshingToken) return;

    yield put(startRefreshingToken());
    const refreshTokenApi = () => apiService.get(ApiEndpoints.REFRESH_TOKEN);
    const resp:LoginResponse = yield call(refreshTokenApi);
    yield put(refreshTokenSuccess(resp));
  } catch (error) {
    action.payload.navigate(PUBLIC_ROUTES_PATH.LOGIN);
  }
}

export function* refreshTokenSaga() {
  yield takeEvery(ActionTypes.REFRESH_TOKEN, refreshToken);
}

function* logoutUser(action: any) {
  try {
    const logoutApi = () => apiService.get(ApiEndpoints.LOGOUT);
    yield call(logoutApi);
    yield put(logout());
    action.payload.navigate(PUBLIC_ROUTES_PATH.LOGIN);
  } catch (error) {
    console.error(error);
  }
}

export function* logoutUserSaga() {
  yield takeLatest(ActionTypes.LOGOUT, logoutUser);
}


