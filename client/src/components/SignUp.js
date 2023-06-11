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

export default function SignUp() {
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = new FormData();
    user.append("firstName", fName);
    user.append("lastName", lName);
    user.append("email", email);
    user.append("password", password);
    user.append("location", location);
    user.append("occupation", occupation);
    user.append("profile", file);

    setIsLoading(true);
    setError("");
    setOpen(true);
    setMessage("");

    try {
      if (!file) throw Error("Profile Pic Required");
      const res = await fetch("http://localhost:3500/auth/register", {
        method: "POST",
        body: user,
      });

      const data = await res.json();
      if (!res.ok) throw Error(data.message);
      setMessage(data.success);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
      setOpen(false);
      setMessage("");
      setIsLoading(false);
    }
  }

  return (
    <Container bgcolor="background.default" color="text.primary" maxWidth="xs" sx={{ pt: 12 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          Sign Up
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
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                fullWidth
                id="lastName"
                label="Last Name"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
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
                inputProps={{ minLength: 6 }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                component="label"
                fullWidth
                sx={{
                  p: 2,
                  fontSize: 20
                }}
              >
                {!fileName
                  ? "+Upload File *"
                  : fileName.slice(12, 31) +
                    "... ." +
                    fileName.substring(
                      fileName.lastIndexOf(".") + 1,
                      fileName.length
                    )}
                <input
                  type="file"
                  hidden
                  id="file"
                  name="file"
                  accept=".jpeg,.jpg,.png"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFileName(e.target.value);
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="location"
                label="Location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="occupation"
                label="Occupation"
                id="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} textAlign={"end"}>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Link component="p" underline="hover" variant="body1">
                  Already have an Account
                </Link>
              </RouterLink>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" size="large">
                Sign Up
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
            color="text.primary"
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
                  Redirecting to Login Page...
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}
