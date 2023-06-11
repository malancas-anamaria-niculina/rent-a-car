import React from "react";
import { Stack, Button } from "@mui/material";

const MarkerMessage = ({
  textFirst,
  textSecond,
  actionFirst,
  dataFirst,
  actionSecond,
  dataSecond,
}) => {
  return (
    <Stack style={{ flexDirection: "row", gap: 8 }}>
      <Button
        variant="contained"
        onClick={async () => {
          await actionFirst(dataFirst);
        }}
      >
        {textFirst}
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          await actionSecond(dataSecond);
        }}
      >
        {textSecond}
      </Button>
    </Stack>
  );
};

export default MarkerMessage;
