import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function ProfileForm() {
  const authCntxt = React.useContext(AuthContext);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/home");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userDetails = {
      userName: data.get("name"),
      photoUrl: data.get("photourl"),
    };
    console.log(userDetails);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCiw7FMYxl7SNKj9nctr7CU6KyoLBlivAk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: userDetails.userName,
          photoUrl: userDetails.photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log("failed", data);
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="l">
        <CssBaseline />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar src="/broken-image.jpg" />
          <Typography component="h1" variant="h5">
            Profile Details
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              style={{ margin: 10 }}
              required
              id="name"
              label="Full Name"
              name="name"
              autoFocus
            />
            <TextField
              style={{ margin: 10 }}
              required
              name="photourl"
              label="Profile Photo URL"
              type="url"
              id="photourl"
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="error"
              style={{ margin: 10 }}
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ margin: 10 }}
            >
              Update
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
