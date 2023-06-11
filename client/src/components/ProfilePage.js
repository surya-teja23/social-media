import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendList from "../widgets/FriendList";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import Navbar from "./Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(
      `https://social-media-7cwn.onrender.com/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <>
      <Navbar />
      <Box>
        <Box
          width="100%"
          padding="2rem 6%"
          sx={{ display: { xs: "block", md: "flex" } }}
          gap="2rem"
          justifyContent="center"
        >
          <Box sx={{ flexBasis: { xs: undefined, md: "26%" } }}>
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <FriendList userId={userId} />
          </Box>
          <Box
            sx={{
              flexBasis: { xs: undefined, md: "42%" },
              mt: { xs: undefined, md: "2rem" },
            }}
          >
            <MyPostWidget picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
