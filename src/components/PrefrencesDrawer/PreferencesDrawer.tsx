import { Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Sources } from "./Sources.tsx";
import { Authors } from "./Authors.tsx";
import { Categories } from "./Categories.tsx";

interface PreferencesDrawerProps {
  open: boolean;
  handleClose: (value: boolean) => void;
}

export const PreferencesDrawer: React.FC<PreferencesDrawerProps> = (props) => {
  const { open, handleClose } = props;

  return (
    <Drawer
      sx={{
        height: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          borderRadius: "1rem",
          height: "90%",
          boxSizing: "border-box",
        },
      }}
      open={open}
      anchor={"bottom"}
      onClose={() => {
        handleClose(false);
      }}
    >
      <IconButton
        onClick={() => handleClose(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon sx={{ cursor: "pointer", textAlign: "end" }} />
      </IconButton>
      <Stack py={"1rem"} px={"30px"}>
        <Typography
          fontWeight="700"
          pt={"22px"}
          mb={"6px"}
          color="secondary.main"
        >
          Setup Preferences
        </Typography>
        <Typography fontWeight="600">
          Choose Sources, Categories & Authors
        </Typography>
        <Divider sx={{ my: "22px", backgroundColor: "#e4e4e4" }} />

        <Sources />
        <Divider sx={{ my: "22px", backgroundColor: "#e4e4e4" }} />

        <Authors />
        <Divider sx={{ my: "22px", backgroundColor: "#e4e4e4" }} />

        <Categories />
      </Stack>
    </Drawer>
  );
};
