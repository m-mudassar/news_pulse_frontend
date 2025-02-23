import { call, put, select, takeEvery } from "redux-saga/effects";
import { ActionTypes } from "../../../ActionTypes.tsx";
import { apiService } from "../../../../helpers/api/ApiService.tsx";
import { ApiEndpoints } from "../../../../helpers/ApiEndpoints.tsx";
import {
  searchSourcesFailure,
  searchSourcesSuccess,
  startSearchingSources,
} from "./searchSourcesSlice.tsx";
import { selectIsSearchingSources } from "./searchSourcesSelectors.tsx";

interface Response {
  success: boolean;
  message: string;
  data: any;
}

function* getSources(action: any) {
  try {
    const isSearchingSources: boolean = yield select(selectIsSearchingSources);
    if (isSearchingSources) return;

    yield put(startSearchingSources());
    const sourcesApi = (data: any) =>
      apiService.get(`${ApiEndpoints.SEARCH_SOURCES}?search=${data?.search}`);
    const resp: Response = yield call(sourcesApi, action.payload.formData);
    yield put(searchSourcesSuccess(resp));
  } catch (error: any) {
    yield put(searchSourcesFailure(error.message));
    // yield put({
    //     type: ActionTypes.SHOW_SNACKBAR,
    //     payload: {
    //         message: "Email or password maybe incorrect.",
    //         severity: SNACKBAR_TYPES.ERROR,
    //     },
    // });
  }
}

export function* searchSourcesSaga() {
  yield takeEvery(ActionTypes.SEARCH_SOURCES, getSources);
}
