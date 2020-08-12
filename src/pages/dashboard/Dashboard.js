import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import PageTitle from "../../components/PageTitle";
import axios from "axios";

export default function Dashboard(props) {
  // const token = localStorage.getItem("id_token");
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:1337/projects", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(response => {
  //       setProjects(response.data);
  //     })
  //     .catch(error => {
  //       // Handle error.
  //     });
  // }, []);

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
}
