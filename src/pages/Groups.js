import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import MaterialTable from "material-table";

export default function Groups({ token }) {
  const [groups, setGroups] = useState();

  const refreshData = () =>
    fetch(`https://lecture-me.herokuapp.com/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    })
      .then(response => response.json())
      .then(groups => setGroups(groups));

  const deleteRow = oldData =>
    fetch(`https://lecture-me.herokuapp.com/groups`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, id: oldData.id })
    }).then(response => response.json());

  useEffect(() => {
    refreshData();
  }, [token]);

  if (!groups) return <div>Loading...</div>;
  return (
    <>
      <MaterialTable
        title="Your groups"
        columns={[{ title: "Name", field: "name" }]}
        data={groups}
        actions={[
          {
            icon: "forward",
            tooltip: "go to group",
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          }
        ]}
        editable={{
          onRowAdd: async newData => {
            // await insertRow(newData);
            // await refreshData();
          },
          onRowUpdate: async (newData, oldData) => {
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
