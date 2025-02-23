import {call, put, select, takeEvery} from "redux-saga/effects";
import {ActionTypes} from "../../../ActionTypes.tsx";
import {apiService} from "../../../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../../../helpers/ApiEndpoints.tsx";
import {
  getAuthorsFailure,
  getAuthorsSuccess,
  loadMoreAuthorsSuccess,
  startGettingAuthors,
} from "./getAuthorsSlice.tsx";
import {selectAuthorsPage, selectIsAuthorsLoading} from "./getAuthorsSelectors.tsx";
import {showSnackbar} from "../../ui-triggers/snackbar/snackbarSlice.tsx";
import {SNACKBAR_TYPES} from "../../../../helpers/constants.tsx";
import {getSourcesFailure} from "../../sources/get/getSourcesSlice.tsx";

interface Response {
  success: boolean;
  message: string;
  data: any;
}

function* getAuthors(action: any) {
  try {
    const isAuthorsLoading: boolean = yield select(selectIsAuthorsLoading);
    if (isAuthorsLoading) return;

    yield put(startGettingAuthors());
    const authorsApi = (data: any) =>
      apiService.get(
        `${ApiEndpoints.GET_AUTHORS}?search=${data?.search}&page=${data?.page}`,
      );
    const resp: Response = yield call(authorsApi, action.payload.formData);
    yield put(getAuthorsSuccess(resp));
  } catch (error: any) {
    yield put(getAuthorsFailure(error.message));
    yield put(showSnackbar({
      message: error.message || "Failed to get authors.",
      severity: SNACKBAR_TYPES.ERROR
    }));
  }
}

export function* getAuthorsSaga() {
  yield takeEvery(ActionTypes.GET_AUTHORS, getAuthors);
}


function* loadMoreAuthors() {
  try {
    const isAuthorsLoading: boolean = yield select(selectIsAuthorsLoading);
    if (isAuthorsLoading) return;

    const page: number = yield select(selectAuthorsPage);
    yield put(startGettingAuthors());
    const authorsApi = (data: any) =>
        apiService.get(
            `${ApiEndpoints.GET_AUTHORS}?search=${data?.search}&page=${data?.page}`,
        );
    const resp: Response = yield call(authorsApi, {page: page+1});
    yield put(loadMoreAuthorsSuccess(resp));
  } catch (error: any) {
    yield put(getSourcesFailure(error.message));
    yield put(showSnackbar({
      message: error.message || "Failed to get authors.",
      severity: SNACKBAR_TYPES.ERROR
    }));
  }
}

export function* loadMoreAuthorsSaga() {
  yield takeEvery(ActionTypes.LOAD_MORE_AUTHORS, loadMoreAuthors);
}