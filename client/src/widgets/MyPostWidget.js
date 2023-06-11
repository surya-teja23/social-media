import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Modal,
  Box,
  InputBase,
  Typography,
  IconButton,
  useTheme,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import AvatarWidget from "../customElements/AvatarWidget";
import FlexBetween from "../customElements/FlexBetween";
import WidgetWrapper from "../customElements/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../features/authSlice";

export default function MyPostWidget({ id, picturePath, firstName }) {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const bgColor = palette.neutral.light;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("posts", image);
    }

    setError("");
    setOpen(true);
    try {
      const response = await fetch("http://localhost:3500/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (response.status === "404")
        throw Error(`${response.status} - ${response.statusText}`);
      if (response.status === "409")
        throw Error(`${response.status} - ${response.statusText}`);
      if (response.status === "401")
        throw Error(`${response.status} - ${response.statusText}`);
      const posts = await response.json();
      if (!response.ok) throw Error(posts);
      dispatch(setPosts({posts}))
      setImage(null);
      setPost("");
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setOpen(false);
    }
  };
  return (
    <WidgetWrapper sx={{ boxShadow: "0 0 5px 0 rgba(0,0,0,0.36)" }}>
      <FlexBetween gap="1.5rem">
        <AvatarWidget
          alt={firstName}
          src={`http://localhost:3500/profile/${picturePath}`}
        />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => {
            setPost(e.target.value);
            setError("");
          }}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: bgColor,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.225rem 0" }} />

      {!!error && (
        <>
          <Alert severity="error">{error}</Alert>
          <Divider sx={{ margin: "1.225rem 0" }} />
        </>
      )}

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        <FlexBetween gap="0.25rem" sx={{ display: { xs: "none", md: "flex" } }}>
          <GifBoxOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Clip</Typography>
        </FlexBetween>

        <FlexBetween gap="0.25rem" sx={{ display: { xs: "none", md: "flex" } }}>
          <AttachFileOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Attachment</Typography>
        </FlexBetween>

        <FlexBetween gap="0.25rem" sx={{ display: { xs: "none", md: "flex" } }}>
          <MicOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Audio</Typography>
        </FlexBetween>

        <FlexBetween gap="0.25rem" sx={{ display: { xs: "flex", md: "none" } }}>
          <MoreHorizOutlined sx={{ color: mediumMain }} />
        </FlexBetween>
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={open}
          onClose={() => false}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            px={2}
            py={5}
            borderRadius={5}
            bgcolor="background.default"
            color="text.primary"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress color="primary" />
            <Typography
              id="modal-modal-title"
              mt={4}
              variant="h5"
              component="h2"
            >
              Uploading post, please wait ...
            </Typography>
          </Box>
        </Modal>
      </FlexBetween>
    </WidgetWrapper>
  );
}
