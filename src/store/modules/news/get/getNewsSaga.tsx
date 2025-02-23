import {call, put, select, takeEvery} from "redux-saga/effects";
import {ActionTypes} from "../../../ActionTypes.tsx";
import {apiService} from "../../../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../../../helpers/ApiEndpoints.tsx";
import {getNewsFailure, getNewsSuccess, startGettingNews,} from "./getNewsSlice.tsx";
import {selectIsNewsLoading} from "./getNewsSelectors.tsx";

interface Response {
  success: boolean;
  message: string;
  data: any;
}

function* getNews(action: any) {
  try {
    const isNewsLoading: boolean = yield select(selectIsNewsLoading);
    if (isNewsLoading) return;

    yield put(startGettingNews());
    const newsApi = (data: any) =>
        apiService.post(ApiEndpoints.GET_NEWS, data);
    const resp: Response = yield call(newsApi, action.payload.formData);
    yield put(getNewsSuccess(resp));
    if(action.payload.handlePopupClose) {
      action.payload.handlePopupClose();
    }
  } catch (error: any) {
    yield put(getNewsFailure(error.message));
    // yield put({
    //     type: ActionTypes.SHOW_SNACKBAR,
    //     payload: {
    //         message: "Email or password maybe incorrect.",
    //         severity: SNACKBAR_TYPES.ERROR,
    //     },
    // });
  }
}

export function* getNewsSaga() {
  yield takeEvery(ActionTypes.GET_NEWS, getNews);
}
