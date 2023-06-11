import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogin } from "../features/authSlice";

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setIsLoading(true);
    setError("");
    setOpen(true);
    setMessage("");

    try {
      if (!email.match(validEmailRegex)) throw Error("Invalid Email");
      const res = await fetch(
        "https://social-media-7cwn.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await res.json();
      if (!res.ok) throw Error(data.message);
      dispatch(
        setLogin({
          user: data.user,
          token: data.accessToken,
        })
      );
      setIsLoading(false);
      setMessage("Login Succesful");
      setTimeout(() => {
        navigate("/homepage");
      }, 3000);
    } catch (err) {
      setError(err.message);
      setOpen(false);
      setMessage("");
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="xs" sx={{ pt: 12 }}>
      <Box
        sx={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h4">Sociopedia</Typography>
          </Toolbar>
        </AppBar>
        <Typography
          component={"h1"}
          variant="h4"
          sx={{ textDecoration: "underline" }}
        >
          Login
        </Typography>
        <Box
          component={"form"}
          onChange={() => setError("")}
          mt={3}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} textAlign={"end"}>
              <RouterLink to="/register" style={{ textDecoration: "none" }}>
                <Link component="p" underline="hover" variant="body1">
                  Don't have an Account
                </Link>
              </RouterLink>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" size="large">
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            px={2}
            py={5}
            borderRadius={5}
            bgcolor="background.default"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {isLoading && (
              <>
                <CircularProgress color="primary" />
                <Typography
                  id="modal-modal-title"
                  mt={4}
                  variant="h5"
                  component="h2"
                >
                  Loading please wait ...
                </Typography>
              </>
            )}
            {message && (
              <>
                <CircularProgress color="success" />
                <Typography mt={3} variant="h5" component="h1">
                  {message}
                </Typography>
                <Typography variant="h6" component="h3">
                  Redirecting to Main Page...
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}
