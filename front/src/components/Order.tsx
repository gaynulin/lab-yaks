import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Chip, ButtonBase } from "@material-ui/core";

import { OrderAPI } from "../api/order.api";
import { OrderDTO } from "../api/dto/order.dto";
 
interface IOrderProps {
  data: OrderDTO;
  onDelete: (taskId: number) => void;
}

const Order = ({ data, onDelete }: IOrderProps) => {
  const deleteOrder = async () => {
    await OrderAPI.deleteOne(data.id);
    onDelete(data.id);
  };

  const getTaskStatusToString = (isParticial: boolean) => 
      isParticial ? "PARTICIAL" : "FULL";

  const getTaskStatusColor = (isParticial: boolean) => 
      isParticial ? "orange" : "green";

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {data.customer}
        </Typography>
        <Typography color="textSecondary" variant="caption">
          {data.created.toString().substring(0, 10)}
        </Typography> 
        <Typography color="primary">
          Day: {data.day}
        </Typography>
        <Typography variant="body2" component="p">
          Milk: {data.milk}
        </Typography>
        <Typography variant="body2" component="p">
          Skins: {data.skins}
        </Typography>

        <Chip
          label={getTaskStatusToString(data.isParticial)}
          style={{
            backgroundColor: getTaskStatusColor(data.isParticial),
            color: "white",
          }}
        />
      </CardContent>
      <CardActions>
        <Container>
          <Button
            color="secondary"
            onClick={deleteOrder}
            size="small"
            style={{ marginLeft: 5 }}
            variant="contained"
          >
            Delete
          </Button> 
        </Container>
      </CardActions>
    </Card>
  );
};

export default Order;
