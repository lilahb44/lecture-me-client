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
  const [orders, setOrder] = useState();
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

  if (!orders) return <div>Loading...</div>;
  return (
    <Wrapper>
      <div className="row about text-center">
        <div className="col-12">
          <h1>Orders</h1>
          <br></br>
        </div>
        <div className="col-12"></div>
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
            render: (rowData) => {
              console.log("price:", rowData.price);
              console.log("id:", rowData.id);
              return (
                paypalLoaded &&
                rowData.status === "Accept" && (
                  <PayPalButton
                    key={rowData.id}
                    createOrder={(data, actions) => {
                      console.log("price:", rowData.price);
                      console.log("id:", rowData.id);
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "ILS",
                              value: rowData.price,
                            },
                            custom_id: rowData.id,
                          },
                        ],
                        application_context: {
                          shipping_preference: "NO_SHIPPING",
                        },
                      });
                    }}
                    onSuccess={(details, data) => {
                      alert(
                        "Transaction completed by " +
                          details.payer.name.given_name
                      );
                      console.log("orderid:", data.orderID);

                      // Call your server to save the transaction
                      return fetch(
                        "https://lecture-me.herokuapp.com/userApi/orders/paypal-pay",
                        {
                          method: "post",
                          headers: {
                            "content-type": "application/json",
                            Authorization: "Bearer " + token,
                          },
                          body: JSON.stringify({
                            orderId: data.orderID,
                          }),
                        }
                      )
                        .then(function (res) {
                          return res.json();
                        })
                        .then(function (details) {
                          alert(
                            "Transaction approved by " +
                              details.payer_given_name
                          );
                        });
                    }}
                  />
                )
              );
            },
          },
        ]}
        data={orders}
      />
    </Wrapper>
  );
}
