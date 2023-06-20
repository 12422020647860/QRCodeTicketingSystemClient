import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { get as getCard, update as updateCard } from "../../services/cards";
import { getAll as getTicketsTypes } from "../../services/ticketsTypes";
import QRCode from "react-qr-code";
import AppBar from "../../components/appBar";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

export default () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [card, setCard] = useState(undefined);
  const [ticketsTypes, setTicketsTypes] = useState([]);
  const [balance, setBalance] = useState("");

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleSubmitClick = () => {
    setSyncing(true);
    updateCard(card.id, {
      balance: parseInt(card.balance) + parseInt(balance),
    }).then((card) => {
      setBalance("");
      setCard(card);
      setSyncing(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getCard(user.uid), getTicketsTypes()]).then(
      ([card, ticketsTypes]) => {
        if (card) {
          setCard(card);
          setTicketsTypes(ticketsTypes);
        }
        setLoading(false);
      }
    );
  }, []);

  const isFormReady = balance;

  return (
    <Stack sx={{ height: "100vh" }}>
      <AppBar />
      {card && ticketsTypes.length && (
        <>
          {parseInt(card.balance) <
            Math.min(...ticketsTypes.map((ticketType) => ticketType.price)) && (
            <Alert severity="error">
              Your balance is {card.balance} please recharge your card
            </Alert>
          )}
          {parseInt(card.balance) >=
            Math.min(...ticketsTypes.map((ticketType) => ticketType.price)) &&
            parseInt(card.balance) <
              Math.max(
                ...ticketsTypes.map((ticketType) => ticketType.price)
              ) && (
              <Alert severity="warning">
                Your balance is {card.balance} you can't buy all tickets
              </Alert>
            )}
          {parseInt(card.balance) >=
            Math.max(...ticketsTypes.map((ticketType) => ticketType.price)) && (
            <Alert severity="info">Your balance is {card.balance}</Alert>
          )}
        </>
      )}
      <Stack sx={{ flexGrow: "1" }} justifyContent="center" alignItems="center">
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="balance">Balance</InputLabel>
          <OutlinedInput
            id="balance"
            label="Balance"
            value={balance}
            onChange={handleBalanceChange}
          />
        </FormControl>
        <Stack spacing={2} direction="column" sx={{ m: 1, width: "25ch" }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            disabled={!isFormReady || syncing}
            onClick={handleSubmitClick}
            type="submit"
          >
            Buy
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2} direction="column" sx={{ m: 1, textAlign: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
      </Stack>
    </Stack>
  );
};
