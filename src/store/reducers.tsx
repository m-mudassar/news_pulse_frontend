import loginSlice from "./modules/auth/login/loginSlice.tsx";
import registerSlice from "./modules/auth/register/registerSlice.tsx";
import getNewsSlice from "./modules/news/get/getNewsSlice.tsx";
import getSourcesSlice from "./modules/sources/get/getSourcesSlice.tsx";
import getCategoriesSlice from "./modules/categories/get/getCategoriesSlice.tsx";
import getAuthorsSlice from "./modules/authors/get/getAuthorsSlice.tsx";
import searchSourcesSlice from "./modules/sources/search/searchSourcesSlice.tsx";
import searchAuthorsSlice from "./modules/authors/search/searchAuthorsSlice.tsx";
import searchCategoriesSlice from "./modules/categories/search/searchCategoriesSlice.tsx";
import snackbarSlice from "./modules/ui-triggers/snackbar/snackbarSlice.tsx";

export const reducers = {
    auth: loginSlice,
    register: registerSlice,
    getNews: getNewsSlice,
    getSources: getSourcesSlice,
    getCategories: getCategoriesSlice,
    getAuthors: getAuthorsSlice,
    searchSources: searchSourcesSlice,
    searchAuthors: searchAuthorsSlice,
    searchCategories: searchCategoriesSlice,
    snackbar: snackbarSlice
}