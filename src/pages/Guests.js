import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  margin: auto;
  width: 96%;
`;

export default function Guests({ token }) {
  const [group, setGroup] = useState();
  let { id } = useParams();

  const refreshData = () =>
    fetch(`https://lecture-me.herokuapp.com/userApi/groups/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((group) => setGroup(group));

  const insertRow = (newData) =>
    fetch(`https://lecture-me.herokuapp.com/userApi/groups/${id}/guests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        firstName: newData.firstName,
        lastName: newData.lastName,
        email: newData.email,
      }),
    }).then((response) => response.json());

  const updateRow = (newData) =>
    fetch(`https://lecture-me.herokuapp.com/userApi/groups/${id}/guests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: newData.id,
        firstName: newData.firstName,
        lastName: newData.lastName,
        email: newData.email,
      }),
    }).then((response) => response.json());

  const deleteRow = (oldData) =>
    fetch(`https://lecture-me.herokuapp.com/userApi/groups/${id}/guests`, {
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

  if (!group) return <div>Loading...</div>;
  return (
    <Wrapper>
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
          { title: "email", field: "email" },
        ]}
        data={group.guests}
        editable={{
          onRowAdd: async (newData) => {
            const result = group.guests.find(
              ({ email }) => email === newData.email
            );
            if (result) {
              alert("The email is already exist");
              return;
            }

            await insertRow(newData);
            await refreshData();
          },
          onRowUpdate: async (newData, oldData) => {
            if (newData.email !== oldData.email) {
              const result = group.guests.find(
                ({ email }) => email === newData.email
              );
              if (result) {
                alert("The email is already exist");
                return;
              }
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
