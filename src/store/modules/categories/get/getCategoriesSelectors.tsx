export const selectCategories = (state:any) => state.getCategories.categories;
export const selectUserCategories = (state:any) => state.getCategories.userCategories;
export const selectIsCategoriesLoading = (state:any) => state.getCategories.loading;

export const selectCategoriesPage = (state:any) => state.getCategories.page;
export const selectCategoriesLastPage = (state:any) => state.getCategories.lastPage;

