import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Friend from "../customElements/Friend";
import WidgetWrapper from "../customElements/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../features/authSlice";

export default function FriendList({ userId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `https://social-media-7cwn.onrender.com/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
        Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend._Id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
}
