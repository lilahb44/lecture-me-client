import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { BrowserRouter as Router, useParams } from "react-router-dom";

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

  const deleteRow = oldData =>
    fetch(`https://lecture-me.herokuapp.com/groups/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ id: oldData.id })
    }).then(response => response.json());

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

      <MaterialTable
        title="Your guests"
        columns={[
          { title: "first name", field: "firstName" },
          { title: "last name", field: "lastName" },
          { title: "email", field: "email" }
        ]}
        data={group.guests}
        editable={{
          onRowAdd: async newData => {
            const i = 32;
          },
          onRowUpdate: async newData => {
            const i = 32;
          },
          onRowDelete: async oldData => {
            await deleteRow(oldData);
            await refreshData();
          }
        }}
      />
    </>
  );
}
