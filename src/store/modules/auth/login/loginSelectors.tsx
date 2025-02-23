export const selectAuthUser = (state:any) => state.auth.user;
export const selectIsRefreshingToken = (state:any) => state.auth.isRefreshingToken;
export const selectIsLoggingIn = (state:any) => state.auth.loading;