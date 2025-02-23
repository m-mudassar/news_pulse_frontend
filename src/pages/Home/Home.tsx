import ResponsiveAppBar from "../../components/AppBar/AppBar.tsx";
import Container from "@mui/material/Container";
import {NewsList} from "../../components/News/NewsList/NewsList.tsx";
import {MyTextField} from "../../components/Wrappers/MyTextField/MyTextField.tsx";
import {Box, IconButton, Pagination} from "@mui/material";
import {PrimaryButton} from "../../components/Wrappers/PrimaryButton/PrimaryButton.tsx";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import React, {useEffect, useState} from "react";
import {useDebounce} from "../../helpers/hooks/useDebounce.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import {useDispatch, useSelector} from "react-redux";
import {ActionTypes} from "../../store/ActionTypes.tsx";
import {selectNews, selectTotNewsPages,} from "../../store/modules/news/get/getNewsSelectors.tsx";
import Stack from "@mui/material/Stack";
import {FilterDrawer} from "../../components/Home/FilterDrawer/FilterDrawer.tsx";

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const news = useSelector(selectNews);
  const totPages = useSelector(selectTotNewsPages);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filterDrawer, setFilterDrawer] = useState(false);

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPage(page);
    getNews(search, page);
  };

  const getNews = (search: string, page: number) => {
    dispatch({
      type: ActionTypes.GET_NEWS,
      payload: {
        formData: {
          search: search,
          page: page,
        },
      },
    });
  };

  useEffect(() => {
    getNews(search, page);
  }, [debouncedSearch]);

  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Box
          sx={[
            () => ({
              gap: 3,
              display: "flex",
              mb: { xs: 3, md: 5 },
              mt: { xs: 3, md: 5 },
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-end", sm: "center" },
            }),
          ]}
        >
          <MyTextField
            helperTextSpace={false}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={"Enter a title to search"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setSearch("")}
                      edge="end"
                      style={{ visibility: search ? "visible" : "hidden" }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <PrimaryButton
            onClick={() => {
              setFilterDrawer(true);
            }}
            style={{ padding: ".8rem 1.6rem" }}
            endIcon={<FilterListTwoToneIcon />}
          >
            Filter
          </PrimaryButton>
        </Box>
        <NewsList newsList={news} />
        <Stack direction={"row"} justifyContent={"end"}>
          {totPages > 1 && (
              <Pagination
                  sx={{m: 5}}
                  count={totPages}
                  color="primary"
                  onChange={handlePagination}
              />
          )}
        </Stack>
      </Container>
      <FilterDrawer
          newsSearch={search}
          open={filterDrawer}
          onClose={() => setFilterDrawer(false)}
      />
    </>
  );
};

export default Home;
