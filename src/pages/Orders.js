import React, { useState, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import MaterialTable from "material-table";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  margin: auto;
  width: 96%;
`;

const useLoadPaypal = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=ASZTQImLWA4NK4i1Zqrgy_iGyvifIQFkB6rKFOgeR8c4MJmutb9OW5PX1FGgNUu2N49ehyFCNYOe38uH&currency=ILS&disable-funding=credit,card`;
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);
  }, []);

  return loaded;
};

export default function Orders({ token }) {
  const [order, setOrder] = useState();
  const paypalLoaded = useLoadPaypal();

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
          <h1>Orders</h1>
          <br></br>
        </div>
        <div class="col-12"></div>
      </div>
      <br></br>
      <br></br>

      <MaterialTable
        title="Orders"
        columns={[
          { title: "Invitation date", field: "date" },
          { title: "Group", field: "groupName" },
          { title: "Lecturer", field: "lecturer" },
          { title: "Address", field: "address" },
          { title: "Status of lecturer", field: "status" },
          {
            title: "Payment",
            render: (rowData) =>
              paypalLoaded &&
              rowData.status === "Accept" && (
                <PayPalButton
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "ILS",
                            value: "3000",
                          },
                          custom_id: "123",
                        },
                      ],
                      application_context: {
                        shipping_preference: "NO_SHIPPING", // default is "GET_FROM_FILE"
                      },
                    });
                  }}
                  onSuccess={(details, data) => {
                    alert(
                      "Transaction completed by " +
                        details.payer.name.given_name
                    );

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({
                        orderId: data.orderID,
                      }),
                    });
                  }}
                />
              ),
          },
        ]}
        data={order}
      />
    </Wrapper>
  );
}
