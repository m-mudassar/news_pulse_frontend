import {NewsCard} from "../NewsCard/NewsCard.tsx";
import Grid from "@mui/material/Grid2";
import React from "react";
import {NewsListProps} from "../../../../types/news.ts";

export const NewsList: React.FC<NewsListProps> = ({ newsList }) => {
  return (
      <Grid container spacing={3} >
        {newsList?.length < 1 && <p>No news found for now. Please come back later.</p>}
        {newsList.map((news) => (
        <Grid
          key={news.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <NewsCard news={news} />
        </Grid>
      ))}
    </Grid>
  );
};
