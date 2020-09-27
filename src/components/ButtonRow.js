import React from "react";
import cx from "classnames";
import { Box, Button } from "@material-ui/core";

import "./button-row.css";

export const ButtonRow = ({ activeKey, items }) => {
  return (
    <Box mb={2} className="item-buttons-row">
      {items.map(({ key, text, color }, i) => (
        <Button
          key={key}
          disableElevation
          variant="contained"
          className={cx("item-button", {
            "item-button-active": activeKey === i + 1,
          })}
          style={{ background: color }}
        >
          <span className="item-button-number" style={{ color }}>
            {i + 1}
          </span>
          {text}
        </Button>
      ))}
    </Box>
  );
};
