export const selectNews = (state:any) => state.getNews.news;
export const selectCurrentNewsPage = (state:any) => state.getNews.currentNewsPage;
export const selectIsNewsLoading = (state:any) => state.getNews.loading;
export const selectTotNewsPages = (state:any) => state.getNews.totNewsPages;