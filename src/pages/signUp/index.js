import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default () => {
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitClick = () => {
    signUp(username, password).then((error) => {
      if (error) setError(error);
      else setError("");
    });
  };

  return (
    <Stack sx={{ height: "100vh" }}>
      <Stack sx={{ flexGrow: "1" }} justifyContent="center" alignItems="center">
        <img
          alt="QR Code Teckting System"
          src="metro-logo.png"
          sx={{ m: 1, width: "25ch" }}
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            id="username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Stack
          spacing={2}
          direction="column"
          sx={{ m: 1, width: "25ch", textAlign: "center" }}
        >
          <Button variant="outlined" onClick={handleSubmitClick} type="submit">
            Submit
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Stack>
        {error && error}
      </Stack>
    </Stack>
  );
};
