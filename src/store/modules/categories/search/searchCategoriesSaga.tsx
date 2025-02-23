import {call, put, select, takeEvery} from "redux-saga/effects";
import {ActionTypes} from "../../../ActionTypes.tsx";
import {apiService} from "../../../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../../../helpers/ApiEndpoints.tsx";
import {searchCategoriesFailure, searchCategoriesSuccess, startSearchingCategories,} from "./searchCategoriesSlice.tsx";
import {selectIsSearchingCategories} from "./searchCategoriesSelectors.tsx";

interface Response {
    success: boolean;
    message: string;
    data: any;
}

function* getSources(action: any) {
    try {
        const isSearchingCategories: boolean = yield select(selectIsSearchingCategories);
        if (isSearchingCategories) return;

        yield put(startSearchingCategories());
        const categoriesApi = (data: any) =>
            apiService.get(`${ApiEndpoints.SEARCH_CATEGORIES}?search=${data?.search}`);
        const resp: Response = yield call(categoriesApi, action.payload.formData);
        yield put(searchCategoriesSuccess(resp));
    } catch (error: any) {
        yield put(searchCategoriesFailure(error.message));
        // yield put({
        //     type: ActionTypes.SHOW_SNACKBAR,
        //     payload: {
        //         message: "Email or password maybe incorrect.",
        //         severity: SNACKBAR_TYPES.ERROR,
        //     },
        // });
    }
}

export function* searchCategoriesSaga() {
    yield takeEvery(ActionTypes.SEARCH_CATEGORIES, getSources);
}
