import {call, put, select, takeEvery} from "redux-saga/effects";
import {ActionTypes} from "../../../ActionTypes.tsx";
import {apiService} from "../../../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../../../helpers/ApiEndpoints.tsx";
import {
  getSourcesFailure,
  getSourcesSuccess,
  loadMoreSourcesSuccess,
  startGettingSources,
} from "./getSourcesSlice.tsx";
import {selectIsSourcesLoading, selectSourcesPage} from "./getSourcesSelectors.tsx";
import {showSnackbar} from "../../ui-triggers/snackbar/snackbarSlice.tsx";
import {SNACKBAR_TYPES} from "../../../../helpers/constants.tsx";

interface Response {
    success: boolean;
    message: string;
    data: any;
}

function* getSources(action: any) {
    try {
        const isSourcesLoading: boolean = yield select(selectIsSourcesLoading);
        if (isSourcesLoading) return;

        yield put(startGettingSources());
        const sourcesApi = (data: any) =>
            apiService.get(
                `${ApiEndpoints.GET_SOURCES}?search=${data?.search}&page=${data?.page}`,
            );
        const resp: Response = yield call(sourcesApi, action.payload.formData);
        yield put(getSourcesSuccess(resp));
    } catch (error: any) {
        yield put(getSourcesFailure(error.message));
        yield put(showSnackbar({
            message: error.message || "Failed to get sources.",
            severity: SNACKBAR_TYPES.ERROR
        }));
    }
}

export function* getSourcesSaga() {
    yield takeEvery(ActionTypes.GET_SOURCES, getSources);
}

function* loadMoreSources() {
  try {
    const isSourcesLoading: boolean = yield select(selectIsSourcesLoading);
    if (isSourcesLoading) return;

    const page: number = yield select(selectSourcesPage);
    yield put(startGettingSources());
    const sourcesApi = (data: any) =>
        apiService.get(
            `${ApiEndpoints.GET_SOURCES}?search=${data?.search}&page=${data?.page}`,
        );
    const resp: Response = yield call(sourcesApi, {page: page+1});
    yield put(loadMoreSourcesSuccess(resp));
  } catch (error: any) {
    yield put(getSourcesFailure(error.message));
    yield put(showSnackbar({
      message: error.message || "Failed to get sources.",
      severity: SNACKBAR_TYPES.ERROR
    }));
  }
}

export function* loadMoreSourcesSaga() {
  yield takeEvery(ActionTypes.LOAD_MORE_SOURCES, loadMoreSources);
}
