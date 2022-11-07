import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./header.scss";


function Header() {
  return (
    <AppBar position="sticky" className="Forstedheader">
      <Container>
        <Toolbar>
          <Typography
          style={{color:"#487380",}}
            variant="h5"
            noWrap
            component="a"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              letterSpacing: ".2rem",
              textDecoration: "none",
            }}
          >
            The WEATHER APP
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
