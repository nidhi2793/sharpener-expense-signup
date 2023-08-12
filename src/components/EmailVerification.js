import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "./UI/Modal";
import { useNavigate } from "react-router-dom";

export default function EmailVerification() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  const token = localStorage.getItem("user");
  const handleEmailVerify = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCiw7FMYxl7SNKj9nctr7CU6KyoLBlivAk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),

        headers: { "Content-Type": "application/json" },
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
        navigate("/home");
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Email Verification
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          A link will be send to your registered email id for verification
        </Typography>
        <Button onClick={handleEmailVerify}>Send Link</Button>
      </Box>
    </Modal>
  );
}
