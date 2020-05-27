import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import MaterialTable from "material-table";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  margin: auto;
  width: 96%;
`;

export default function Groups({ token }) {
  const [groups, setGroups] = useState();
  const history = useHistory();

  const refreshData = () =>
    fetch(`https://lecture-me.herokuapp.com/userApi/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((groups) => setGroups(groups));

  const insertRow = (newData) =>
    fetch(`https://lecture-me.herokuapp.com/userApi/groups`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ name: newData.name }),
    }).then((response) => response.json());

  const updateRow = (newData) =>
    fetch(`https://lecture-me.herokuapp.com/userApi/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ id: newData.id, name: newData.name }),
    }).then((response) => response.json());

  const deleteRow = (oldData) =>
    fetch(`https://lecture-me.herokuapp.com/userApi/groups`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ id: oldData.id }),
    }).then((response) => response.json());

  useEffect(() => {
    refreshData();
  }, [token]);

  if (!groups) return <div>Loading...</div>;
  return (
    <Wrapper>
      <div class="row about text-center">
        <div class="col-12">
          <h1>Groups</h1>
          <br></br>
        </div>
      </div>
      <MaterialTable
        columns={[{ title: "Name", field: "name" }]}
        data={groups}
        actions={[
          {
            icon: "forward",
            tooltip: "go to group",
            onClick: (event, { id }) => {
              history.push("/groups/" + id);
            },
          },
        ]}
        editable={{
          onRowAdd: async (newData) => {
            const result = groups.find(({ name }) => name === newData.name);
            if (result) {
              alert("The name is already exist");
              return;
            }

            await insertRow(newData);
            await refreshData();
          },
          onRowUpdate: async (newData) => {
            const result = groups.find(({ name }) => name === newData.name);
            if (result) {
              alert("The name is already exist");
              return;
            }

            await updateRow(newData);
            await refreshData();
          },
          onRowDelete: async (oldData) => {
            await deleteRow(oldData);
            await refreshData();
          },
        }}
      />
    </Wrapper>
  );
}
