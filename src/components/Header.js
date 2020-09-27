import React from "react";
import { Container, AppBar, Toolbar, Typography } from "@material-ui/core";

export const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography variant="h6">Text Labeller</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
