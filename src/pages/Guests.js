import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import MaterialTable from "material-table";
import Link from "@material-ui/core/Link";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

export default function Guests({ token }) {
  const [group, setGroup] = useState();
  let { id } = useParams();

  const refreshData = () =>
    fetch(`https://lecture-me.herokuapp.com/groups/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(group => setGroup(group));

  useEffect(() => {
    refreshData();
  }, [token]);

  if (!group) return <div>Loading...</div>;
  return (
    <>
      <div class="row about text-center">
        <div class="col-12">
          <h1>Group - "{group.name}"</h1>
        </div>
      </div>
    </>
  );
}
