import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { Link, NavLink } from "react-router-dom";
import "./Layout.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default function Layout() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false,
  });

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  //   const toggleDrawer = (open) => (event) => {
  //     // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     //   return;
  //     // }

  //     setState({ left: open });
  //   };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  });

  return (
    <div className={classes.root}>
      <React.Fragment>
        {/* <Button onClick={toggleDrawer("left", true)}>Menu</Button> */}
        <Drawer open={state.left} onClose={() => setState({ left: false })}>
          <div className={classes.list} role="presentation">
            <List>
              <ListItem
                button
                key={"Home"}
                onClick={() => setState({ left: false })}
              >
                <ListItemIcon>
                  <MailIcon></MailIcon>
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
              <ListItem
                button
                key={"burger-builder"}
                onClick={() => setState({ left: false })}
              >
                <ListItemIcon>
                  <MailIcon></MailIcon>
                </ListItemIcon>
                <ListItemText primary={"Burger Builder"} />
              </ListItem>
            </List>
            <Divider />
          </div>
        </Drawer>
      </React.Fragment>

      <AppBar position="static">
        <Toolbar>
          {windowWidth < 600 && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setState({ left: true });
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Burger Builder
          </Typography>
          {windowWidth > 600 && (
            <React.Fragment>
            
                <NavLink className = "myLink" to="/" exact>  <Button color="inherit">Home </Button></NavLink>
              
              {/* <Button color="inherit"><NavLink to ={{pathname : "/", search : "query=1"}}>Burger Builder</NavLink></Button> */}
              <Button color="inherit">
                <NavLink className = "myLink" to="/burger" exact >Burger Builder</NavLink>
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
