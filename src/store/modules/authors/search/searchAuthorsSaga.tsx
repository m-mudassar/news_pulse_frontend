import {call, put, select, takeEvery} from "redux-saga/effects";
import {ActionTypes} from "../../../ActionTypes.tsx";
import {apiService} from "../../../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../../../helpers/ApiEndpoints.tsx";
import {searchAuthorsFailure, searchAuthorsSuccess, startSearchingAuthors,} from "./searchAuthorsSlice.tsx";
import {selectIsSearchingAuthors} from "./searchAuthorsSelectors.tsx";

interface Response {
    success: boolean;
    message: string;
    data: any;
}

function* searchAuthors(action: any) {
    try {
        const isSearchingAuthors: boolean = yield select(selectIsSearchingAuthors);
        if (isSearchingAuthors) return;

        yield put(startSearchingAuthors());
        const authorsApi = (data: any) =>
            apiService.get(`${ApiEndpoints.SEARCH_AUTHORS}?search=${data?.search}`);
        const resp: Response = yield call(authorsApi, action.payload.formData);
        yield put(searchAuthorsSuccess(resp));
    } catch (error: any) {
        yield put(searchAuthorsFailure(error.message));
        // yield put({
        //     type: ActionTypes.SHOW_SNACKBAR,
        //     payload: {
        //         message: "Email or password maybe incorrect.",
        //         severity: SNACKBAR_TYPES.ERROR,
        //     },
        // });
    }
}

export function* searchAuthorsSaga() {
    yield takeEvery(ActionTypes.SEARCH_AUTHORS, searchAuthors);
}
