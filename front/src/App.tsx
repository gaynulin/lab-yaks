import React, { useEffect, useState } from "react";

import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

import { OrderAPI } from "./api/order.api";
import { OrderDTO } from "./api/dto/order.dto";

import Order from "./components/Order";
import CreateOrderModal from "./components/CreateOrderModal"; 

import "./app.css";

function App() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const addOrder = (order: OrderDTO) => {
    setOrders([...orders, order]);
  };

  const deleteOrder = (id: number) => {
    setOrders(orders.filter((x) => x.id !== id));
  };

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    async function fetchAll() {
      const resp = await OrderAPI.getAll();

      setOrders(resp); 
    }

    fetchAll();
  }, []);

  return (
    <section className="app">
      <CreateOrderModal
        open={isModalOpen}
        handleClose={closeModal}
        onOrderCreated={addOrder}
      />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            The YakShop
          </Typography>
          <Button
            color="primary"
            onClick={openModal}
            variant="contained"
          >
            Place Order
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={1} style={{ padding: 10 }}>
        {orders.map((order) =>(
            <Grid key={order.id} item xs={3}>
              <Order data={order} onDelete={deleteOrder} />
            </Grid>
          ))}
      </Grid>
    </section>
  );
}

export default App;
