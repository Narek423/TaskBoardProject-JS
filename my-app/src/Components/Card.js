import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 500, maxWidth: "90%" }}>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
