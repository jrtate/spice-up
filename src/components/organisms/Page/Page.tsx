import React, { useState } from "react";
import { Box, Drawer, IconButton, Paper, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import SettingsIcon from "@mui/icons-material/Settings";
import { PageContainer } from "./styles";
import SettingsModal from "../SettingsModal/SettingsModal";
import { invalidateTokenSession } from "../../../utils/tokenService";

const Page = ({ children }: any) => {
  const navigate = useNavigate();
  const [path, setPath] = useState<string>(window.location.pathname);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const drawerWidth = 48;

  const handleLogout = () => {
    invalidateTokenSession();
    navigate("/login");
  };

  return (
    <PageContainer>
      <SettingsModal
        show={showSettingsModal}
        closeModal={() => setShowSettingsModal(false)}
      />
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
              backgroundColor: "rgb(20 20 20)",
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
                      <EmojiObjectsIcon />
                    </IconButton>
                  </Paper>
                </Link>
              </Tooltip>

              <Tooltip title="Arrange" placement="right">
                <Link to="/arrange">
                  <Paper elevation={path === "/arrange" ? 3 : 0}>
                    <IconButton
                      onClick={() => setPath("/arrange")}
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
            </Box>

            <Box
              px={2}
              mb={2}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Tooltip title="Settings" placement="right">
                <IconButton
                  color="primary"
                  onClick={() => setShowSettingsModal(true)}
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout" placement="right">
                <IconButton color="primary" onClick={() => handleLogout()}>
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
          {children}
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default Page;
