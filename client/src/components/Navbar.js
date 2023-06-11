import {
  AppBar,
  Badge,
  Box,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DarkMode,
  Help,
  LightMode,
  Logout,
  Message,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarWidget from "../customElements/AvatarWidget";
import { useSelector } from "react-redux";
import { setMode, setLogout } from "../features/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const theme = useTheme();
  const [longMenuOpen, setLongMenuOpen] = useState(false);
  const [shortMenuOpen, setShortMenuOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <Toolbar gap="1.5rem">
        <Typography
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => navigate("/homepage")}
          variant="h5"
          component="h1"
        >
          SocioPedia
        </Typography>
        <Box
          sx={{
            backgroundColor: "background.default",
            borderRadius: "9px",
            display: "none",
            justifyContent: "space-between",
            alignItems: "center",
            p: "5px",
            ml: "25px",
            [theme.breakpoints.up("md")]: {
              display: "flex",
            },
          }}
        >
          <InputBase
            sx={{
              backgroundcolor: "background.default",
              color: "text.primary",
            }}
            placeholder="Search"
          />
          <Search
            sx={{
              backgroundcolor: "background.default",
              color: "text.primary",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "none",
            justifyContent: "space-between",
            alignItems: "center",
            ml: "auto",
            gap: "15px",
            [theme.breakpoints.up("sm")]: {
              display: "flex",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={setMode}
          >
            {mode === "light" ? <LightMode /> : <DarkMode />}
          </Box>
          <Badge
            badgeContent={5}
            color={mode === "light" ? "error" : "info"}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Message />
          </Badge>
          <Badge
            badgeContent={2}
            color={mode === "light" ? "error" : "info"}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Notifications />
          </Badge>
          <Help sx={{ display: { sm: "none", md: "block" } }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              ml: "auto",
              gap: "10px",
            }}
          >
            <AvatarWidget
              alt={user.firstName}
              src={`https://social-media-7cwn.onrender.com/profile/${user.picturePath}`}
              onClick={() => setShortMenuOpen(true)}
              sx={{}}
            />
            <Typography
              variant="h6"
              onClick={() => setShortMenuOpen(true)}
              sx={{
                "&:hover": { cursor: "pointer" },
              }}
            >
              : {user.firstName}
            </Typography>
            <Menu
              open={shortMenuOpen}
              onClose={() => setShortMenuOpen(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>
                Profile
              </MenuItem>
              <MenuItem onClick={setLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ml: "auto",
            gap: "15px",
            [theme.breakpoints.up("sm")]: {
              display: "none",
            },
          }}
        >
          <MenuIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={() => setLongMenuOpen(true)}
          />
          <Menu
            open={longMenuOpen}
            onClose={() => setLongMenuOpen(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={setMode}>
              <ListItemIcon>
                {mode === "light" ? (
                  <LightMode fontSize="small" />
                ) : (
                  <DarkMode fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText>
                {mode[0].toUpperCase()}
                {mode.slice(1)}
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Message fontSize="small" />
              </ListItemIcon>
              <ListItemText>Messages</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Notifications fontSize="small" />
              </ListItemIcon>
              <ListItemText>Notifications</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={setLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
