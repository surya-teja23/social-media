import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ProfilePage from "./components/ProfilePage";
import { themeSettings } from "./theme";

export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = createTheme(themeSettings(mode))
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/homepage"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
    </ThemeProvider>
  );
}