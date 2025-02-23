export const selectAuthors = (state:any) => state.getAuthors.authors;
export const selectUserAuthors = (state:any) => state.getAuthors.userAuthors;
export const selectIsAuthorsLoading = (state:any) => state.getAuthors.loading;
export const selectAuthorsPage = (state:any) => state.getAuthors.page;
export const selectAuthorsLastPage = (state:any) => state.getAuthors.lastPage;

