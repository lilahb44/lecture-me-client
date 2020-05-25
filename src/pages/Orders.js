import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  margin: auto;
  width: 96%;
`;

export default function Orders({ token }) {
  const [order, setOrder] = useState();

  const refreshData = () =>
    fetch(`https://lecture-me.herokuapp.com/userApi/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((order) => setOrder(order));

  useEffect(() => {
    refreshData();
  }, [token]);

  if (!order) return <div>Loading...</div>;
  return (
    <Wrapper>
      <div class="row about text-center">
        <div class="col-12">
          <h1>Your Orders</h1>
          <br></br>
        </div>
        <div class="col-12"></div>
      </div>
      <br></br>
      <br></br>

      <MaterialTable
        title="Your orders"
        columns={[
          { title: "Invitation date", field: "date" },
          { title: "Group", field: "groupName" },
          { title: "Lecturer", field: "lecturer" },
          { title: "Address", field: "address" },
          { title: "Status of lecturer", field: "status" },
        ]}
        data={order}
      />
    </Wrapper>
  );
}
