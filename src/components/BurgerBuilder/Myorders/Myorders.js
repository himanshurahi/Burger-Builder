import React, { useState } from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Spinner from "../spinner/spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function Myorders(props) {
  const classes = useStyles();

  const [ing, setIng] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const [Input, SetInput] = useState({ inputs: ["input-0"] });

  React.useEffect(() => {
    fetchData();
  }, []);

  let fetchedArray = [];
  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://burger-builder-374c1.firebaseio.com/orders.json")
      .then((data) => {
        for (let key in data.data) {
          fetchedArray.push({ id: key, ...data.data[key] });
        }
        setIng(fetchedArray);
        setLoading(false);
      });

    console.log(ing && ing.length);

    // console.log(showArray);
  };

  //   const addFields = () => {
  //     let inp = Input.inputs;
  //     // inp.push({inputs : "input-"+inp.length});
  //     inp.push("input-" + inp.length);
  //     SetInput({ inputs: inp });
  //     console.log(inp);
  //     // SetInput(inp)
  //     // console.log(inp)
  //   };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <div>
        <Grid container spacing={3}>
          {!loading ? (
            ing.length == 0 ? (
              <Grid item lg={12} sm={12} xs={12}>
                <Paper className={classes.paper} elevation={3}>
                  <h4>No Orders Found :(</h4>
                </Paper>
              </Grid>
            ) : (
              ing.map((i, index) => {
                return (
                  <Grid item lg={12} sm={12} xs={12} key={index}>
                    <Paper
                      className={classes.paper}
                      elevation={3}
                      style={{ textAlign: "left" }}
                    >
                      <h4>
                        Ingredients :{" "}
                        {Object.keys(i.ing).map((el, index) => (
                          <span
                            key={index}
                            style={{ textTransform: "capitalize" }}
                          >
                            {" "}
                            {el}({i.ing[el]})
                          </span>
                        ))}
                      </h4>
                      <h3>
                        Price: <strong>{i.totalPrice} ₹</strong>
                      </h3>
                    </Paper>
                  </Grid>
                );
              })
            )
          ) : (
            <div style={{ width: "100%" }}>
              <Spinner />
            </div>
          )}
        </Grid>
      </div>
    </Container>
  );
}

// return (
// <Grid item lg={12} sm={12} xs={12} key={index}>
//   <Paper
//     className={classes.paper}
//     elevation={3}
//     style={{ textAlign: "left" }}
//   >
//     <h4>
//       Ingredients :{" "}
//       {Object.keys(i.ing).map((el, index) => (
//         <span
//           key={index}
//           style={{ textTransform: "capitalize" }}
//         >
//           {" "}
//           {el}({i.ing[el]})
//         </span>
//       ))}
//     </h4>
//     <h3>
//       Price: <strong>{i.totalPrice} ₹</strong>
//     </h3>
//   </Paper>
// </Grid>
//   );

export default Myorders;
