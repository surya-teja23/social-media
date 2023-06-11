import React from "react";
import { Box, useTheme } from "@mui/material";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendList from "../widgets/FriendList";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

export default function MainPage() {
  const theme = useTheme();
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        sx={{
          display: "block",
          [theme.breakpoints.up("md")]: {
            display: "flex",
            alignItems: "flex-start",
          },
        }}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          sx={{
            flexBasis: { xs: undefined, md: "40%" },
            boxShadow: "0 0 5px 0 rgba(0,0,0,0.36)",
            position: { xs: "static", md: "sticky" },
          }}
        >
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          sx={{
            flexBasis: { xs: undefined, md: "60%" },
            mt: { xs: "15px", md: "0" },
          }}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        <Box
          sx={{
            boxShadow: "0 0 5px 0 rgba(0,0,0,0.36)",
            [theme.breakpoints.down("lg")]: {
              display: "none",
            },
            [theme.breakpoints.up("lg")]: {
              flexBasis: "32%",
            },
          }}
        >
          <FriendList userId={_id} />
        </Box>
      </Box>
    </>
  );
}
