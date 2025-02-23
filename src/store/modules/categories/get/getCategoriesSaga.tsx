import {call, put, select, takeEvery} from "redux-saga/effects";
import {ActionTypes} from "../../../ActionTypes.tsx";
import {apiService} from "../../../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../../../helpers/ApiEndpoints.tsx";
import {
    getCategoriesFailure,
    getCategoriesSuccess,
    loadMoreCategoriesSuccess,
    startGettingCategories,
} from "./getCategoriesSlice.tsx";
import {selectCategoriesPage, selectIsCategoriesLoading} from "./getCategoriesSelectors.tsx";
import {showSnackbar} from "../../ui-triggers/snackbar/snackbarSlice.tsx";
import {SNACKBAR_TYPES} from "../../../../helpers/constants.tsx";

interface Response {
    success: boolean;
    message: string;
    data: any;
}

function* getCategories(action: any) {
    try {
        const isCategoriesLoading: boolean = yield select(
            selectIsCategoriesLoading,
        );
        if (isCategoriesLoading) return;

        yield put(startGettingCategories());
        const categoriesApi = (data: any) =>
            apiService.get(
                `${ApiEndpoints.GET_CATEGORIES}?search=${data?.search}&page=${data?.page}`,
            );
        const resp: Response = yield call(categoriesApi, action.payload.formData);
        yield put(getCategoriesSuccess(resp));
    } catch (error: any) {
        yield put(getCategoriesFailure(error.message));
        yield put(showSnackbar({
            message: error.message || "Failed to get categories.",
            severity: SNACKBAR_TYPES.ERROR
        }));
    }
}

export function* getCategoriesSaga() {
    yield takeEvery(ActionTypes.GET_CATEGORIES, getCategories);
}


function* loadMoreCategories() {
    try {
        const isCategoriesLoading: boolean = yield select(selectIsCategoriesLoading);
        if (isCategoriesLoading) return;

        const page: number = yield select(selectCategoriesPage);
        yield put(startGettingCategories());
        const categoriesApi = (data: any) =>
            apiService.get(
                `${ApiEndpoints.GET_CATEGORIES}?search=${data?.search}&page=${data?.page}`,
            );
        const resp: Response = yield call(categoriesApi, {page: page + 1});
        yield put(loadMoreCategoriesSuccess(resp));
    } catch (error: any) {
        yield put(getCategoriesFailure(error.message));
        yield put(showSnackbar({
            message: error.message || "Failed to get categories.",
            severity: SNACKBAR_TYPES.ERROR
        }));
    }
}

export function* loadMoreCategoriesSaga() {
    yield takeEvery(ActionTypes.LOAD_MORE_CATEGORIES, loadMoreCategories);
}