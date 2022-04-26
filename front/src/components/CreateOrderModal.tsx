import React, { useState } from "react";

import { Modal, makeStyles, TextField, Button } from "@material-ui/core";

import { OrderAPI } from "../api/order.api";
import { OrderDTO } from "../api/dto/order.dto";

interface ICreateOrderModalProps {
  open: boolean;
  handleClose: () => void;
  onOrderCreated: (order: OrderDTO) => void;
}

enum ResponseStatus {
  PARTIAL,
  FULL,
  FAILED
}

const CreateOrderModal = (props: ICreateOrderModalProps) => {
  // TODO: Move to css.
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField: {
      width: "100%",
    },
    createBtn: {
      width: "100%",
      marginTop: 10,
    },
  }));
  const classes = useStyles();

  const [customer, setCustomer] = useState("");
  const [result, setResult] = useState<undefined | { status: ResponseStatus, msg: string }>(undefined);
  const [skins, setSkins] = useState(0);
  const [milk, setMilk] = useState(0);
  const [day, setDay] = useState(0);

  const createOrder = async () => {
    const resp = await OrderAPI.createOne(day, {
      customer,
      order: { milk, skins },
    });

    if (resp) {
      props.onOrderCreated(resp);
      setResult({ status: resp.isParticial ? ResponseStatus.PARTIAL : ResponseStatus.FULL, msg: JSON.stringify(resp) });
    } else {
      setResult({ status: ResponseStatus.FAILED, msg: "Sorry, we couldn't place an order ^(" });
    }
  };

  const close = () => {
    setResult(undefined);
    props.handleClose();
  }

  const isDisabled = () => day < 1 || !customer || !(milk || skins);

  const getButtonColor = (status: ResponseStatus) => {
    switch (status) {
      case ResponseStatus.FULL:
        return "primary";
      case ResponseStatus.PARTIAL:
        return "default";
      case ResponseStatus.FAILED:
      default:
        return "secondary"
    }
  }

  return (
    <div>
      <Modal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        onClose={props.handleClose}
        open={props.open}
      >
        <div style={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          justifyContent: "center"
        }}>
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Place New Order</h2>
            <p id="simple-modal-description">
              Chaeck availability and place an order in the stock.
            </p>
            {result ?
              <div>
                Order {result.status === ResponseStatus.FAILED && "is not"} created:
                <code style={{ overflowWrap: "break-word" }}>{result.msg}</code>
                <Button
                  className={classes.createBtn}
                  color={getButtonColor(result.status)}
                  onClick={close}
                  variant="contained"
                >
                  I See..
                </Button>
              </div>
              :
              <div>
                <TextField
                  className={classes.textField}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Customer"
                  variant="filled"
                />
                <TextField
                  className={classes.textField}
                  onChange={(e) => setMilk(Number(e.target.value))}
                  placeholder="Milk"
                  type="number"
                  variant="filled"
                />
                <TextField
                  className={classes.textField}
                  onChange={(e) => setSkins(Number(e.target.value))}
                  placeholder="Skins"
                  type="number"
                  variant="filled"
                />
                <TextField
                  className={classes.textField}
                  onChange={(e) => setDay(Number(e.target.value))}
                  placeholder="Day"
                  type="number"
                  variant="filled"
                />
                <Button
                  className={classes.createBtn}
                  color="primary"
                  disabled={isDisabled()}
                  onClick={createOrder}
                  variant="contained"
                >
                  Place Order
                </Button>
              </div>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateOrderModal;
