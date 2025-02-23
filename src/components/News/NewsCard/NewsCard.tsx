import Typography from "@mui/material/Typography";
import React from "react";
import { NewsProps } from "../../../../types/news.ts";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsNewsLoading } from "../../../store/modules/news/get/getNewsSelectors.tsx";

export const NewsCard: React.FC<{ news: NewsProps }> = (props) => {
  const { news } = props;
  const placeholder =
    "https://blog.snappymob.com/wp-content/uploads/2020/12/8-Tips-for-Designing-Empty-Placeholder-Pages-Leni-Featured.png";

  const isNewsLoading = useSelector(selectIsNewsLoading);

  const NewsCardSkeleton = () => {
    return (
      <Card
        sx={{
          height: "100%",
          maxWidth: 345,
          borderRadius: ".5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image Placeholder */}
        <Skeleton variant="rectangular" height={140} width="100%" />

        <CardContent sx={{ flexGrow: 1 }}>
          {/* Title Placeholder */}
          <Skeleton variant="text" width="80%" height={28} />
          {/* Description Placeholder */}
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="70%" height={20} />
        </CardContent>

        <CardActions sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {/* Chip Placeholders */}
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={100} height={32} />
          <Skeleton variant="rounded" width={120} height={32} />
        </CardActions>
      </Card>
    );
  };

  if (isNewsLoading) return <NewsCardSkeleton />;

  return (
    <Card
      sx={{
        height: "100%",
        maxWidth: 345,
        borderRadius: ".5rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={news.image_url || placeholder}
        title="green iguana"
        // onError={(e) => (e.currentTarget.src = placeholder)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className={"truncate-text"}
        >
          {news.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className={"truncate-text truncate-lines-4"}
        >
          {news.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Chip
          label={news.author.name}
          color={"primary"}
          sx={{
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Chip
          label={news.category.name}
          color={"secondary"}
          sx={{
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Chip
          label={news.source.name}
          sx={{
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
      </CardActions>
    </Card>
  );
};
