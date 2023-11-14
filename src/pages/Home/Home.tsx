import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { Route, Link, Routes, Navigate } from "react-router-dom";
import { HomeContainer } from "./styles";
import Plan from "components/organisms/Calendar/Plan";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LogoutIcon from "@mui/icons-material/Logout";
import Act from "../Act/Act";
import Reflect from "../Reflect/Reflect";

const Home = () => {
  const [path, setPath] = useState<string>(window.location.pathname);
  const drawerWidth = 48;

  return (
    <HomeContainer>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Box
            mt={1}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Tooltip title="Plan" placement="right">
                <Link to="/plan">
                  <Paper elevation={path === "/plan" ? 3 : 0}>
                    <IconButton
                      onClick={() => setPath("/plan")}
                      color="primary"
                    >
                      <EditCalendarIcon />
                    </IconButton>
                  </Paper>
                </Link>
              </Tooltip>

              <Tooltip title="Act" placement="right">
                <Link to="/act">
                  <Paper elevation={path === "/act" ? 3 : 0}>
                    <IconButton onClick={() => setPath("/act")} color="primary">
                      <PendingActionsIcon />
                    </IconButton>
                  </Paper>
                </Link>
              </Tooltip>

              {/*<Tooltip title="Reflect" placement="right">
                <Link to="/reflect">
                  <Paper elevation={path === "/reflect" ? 3 : 0}>
                    <IconButton
                      onClick={() => setPath("/reflect")}
                      color="primary"
                    >
                      <LocalCafeIcon />
                    </IconButton>
                  </Paper>
                </Link>
              </Tooltip>*/}
            </Box>

            <Box
              px={2}
              mb={2}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tooltip title="Logout" placement="right">
                <IconButton color="primary">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Drawer>
      </Box>

      <Paper elevation={0} sx={{ width: "100%" }}>
        <Box
          component="main"
          sx={{
            height: "100%",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <Routes>
            <Route
              path="/plan"
              element={
                <>
                  <Plan />
                </>
              }
            />
            <Route
              path="/act"
              element={
                <>
                  <Act />
                </>
              }
            />
            <Route
              path="/reflect"
              element={
                <>
                  <Reflect />
                </>
              }
            />

            <Route index element={<Navigate to="/plan" replace />} />
          </Routes>
        </Box>
      </Paper>
    </HomeContainer>
  );
};

export default Home;
