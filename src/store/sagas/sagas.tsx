import {loginSaga, logoutUserSaga, refreshTokenSaga,} from "../modules/auth/login/loginSaga.tsx";
import {registerSaga} from "../modules/auth/register/registerSaga.tsx";
import {getNewsSaga} from "../modules/news/get/getNewsSaga.tsx";
import {getSourcesSaga, loadMoreSourcesSaga} from "../modules/sources/get/getSourcesSaga.tsx";
import {getCategoriesSaga, loadMoreCategoriesSaga} from "../modules/categories/get/getCategoriesSaga.tsx";
import {getAuthorsSaga, loadMoreAuthorsSaga} from "../modules/authors/get/getAuthorsSaga.tsx";
import {searchSourcesSaga} from "../modules/sources/search/searchSourcesSaga.tsx";
import {searchAuthorsSaga} from "../modules/authors/search/searchAuthorsSaga.tsx";
import {searchCategoriesSaga} from "../modules/categories/search/searchCategoriesSaga.tsx";

export const sagas = [
  loginSaga(),
  registerSaga(),
  refreshTokenSaga(),
  logoutUserSaga(),
  getNewsSaga(),
  getSourcesSaga(),
  getCategoriesSaga(),
  getAuthorsSaga(),
  searchSourcesSaga(),
  searchAuthorsSaga(),
  searchCategoriesSaga(),
  loadMoreSourcesSaga(),
  loadMoreAuthorsSaga(),
  loadMoreCategoriesSaga(),
];
