import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { ProjectName } from "../App";
function MatLayout() {
  const navigate = useNavigate();

  const gotoBoard = () => {
    navigate("/");
  };

  const goToScore = () => {
    navigate("/scores");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              }}
            >
              {ProjectName}
            </Typography>

            <Button
              color="inherit"
              onClick={gotoBoard}
              style={{
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              }}
            >
              Game
            </Button>

            <Button
              color="inherit"
              onClick={goToScore}
              style={{
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              }}
            >
              Example Scores API
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        sx={{
          mt: 2,
        }}
      >
        {/* Where the each page show up in the same layout */}
        <Outlet />
      </Container>
    </>
  );
}

export default MatLayout;
