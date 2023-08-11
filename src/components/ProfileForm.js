import * as React from "react";
import { useRef, useState } from "react";
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
import { FormControl } from "@mui/material";

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
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef();
  let nameRef = useRef();
  let photoRef = useRef();

  const updateVisibleHandler = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCiw7FMYxl7SNKj9nctr7CU6KyoLBlivAk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
          }),
        }
      );
      const data = await res.json();
      if (data.users) {
        // setUserData(data.users[0]);
        nameRef.current.value = data.users[0].displayName;
        photoRef.current.value = data.users[0].photoUrl;
      }

      console.log("data", data);
    } catch (error) {
      alert(error);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  React.useEffect(() => {
    updateVisibleHandler();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const photoUrl = photoRef.current.value;

    // const data = new FormData(event.currentTarget);
    // let userDetails = {
    //   userName: data.get("name"),
    //   photoUrl: data.get("photourl"),
    // };
    // console.log(userDetails);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCiw7FMYxl7SNKj9nctr7CU6KyoLBlivAk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: enteredName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Profile Updated");
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log("failed", data);
            let errorMessage = "Profile Update Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);

        // navigate("/home");
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
            <Box
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <label>Full Name:</label>
              <TextField
                style={{ margin: 10 }}
                required={true}
                id="name"
                // label="Full Name"
                name="name"
                inputRef={nameRef}
                autoFocus
              />
            </Box>
            <Box
              sx={{
                mt: 1,
                marginLeft: 2,
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <label>Contact no:</label>
              <TextField
                style={{ margin: 10 }}
                required={true}
                name="photo_url"
                // label="Photo url"
                id="photo_url"
                inputRef={photoRef}
              />
            </Box>
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
