import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { get as getCard, add as addCard } from "../../services/cards";
import { getAll as getTicketsTypes } from "../../services/ticketsTypes";
import QRCode from "react-qr-code";
import AppBar from "../../components/appBar";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [initializingAddCardProcess, setInitializingAddCardProcess] =
    useState(false);
  const [card, setCard] = useState(undefined);
  const [ticketsTypes, setTicketsTypes] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getCard(user.uid), getTicketsTypes()]).then(
      ([card, ticketsTypes]) => {
        setTicketsTypes(ticketsTypes);
        if (card) {
          setCard(card);
        } else {
          setInitializingAddCardProcess(true);
        }
        setLoading(false);
      }
    );
  }, []);
  useEffect(() => {
    if (!loading && initializingAddCardProcess) {
      setLoading(true);
      addCard({ uid: user.uid }).then((card) => {
        setCard(card);
        setInitializingAddCardProcess(false);
        setLoading(false);
      });
    }
  }, [initializingAddCardProcess]);

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
        {loading ? (
          <CircularProgress />
        ) : card ? (
          <>
            <QRCode value={JSON.stringify({ id: card.id, type: "card" })} />
          </>
        ) : (
          <div>
            something went wrong please relogin or contact our support team
          </div>
        )}
      </Stack>
      {card && (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ m: 1 }}
          onClick={() => {
            navigate("/recharge");
          }}
        >
          Recharge you balance
        </Button>
      )}
    </Stack>
  );
};
