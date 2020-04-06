import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  margin: auto;
  width: 96%;
`;

export default function Surveys({ token }) {
  const [survey, setSurvey] = useState();

  const refreshData = () =>
    fetch(`https://lecture-me.herokuapp.com/surveys`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((survey) => setSurvey(survey));

  useEffect(() => {
    refreshData();
  }, [token]);

  if (!survey) return <div>Loading...</div>;
  return (
    <Wrapper>
      <div class="row about text-center">
        <div class="col-12">
          <h1>Your Surveys</h1>
        </div>
      </div>

      <MaterialTable
        title="Your surveys"
        columns={[
          { title: "date", field: "date" },
          { title: "name", field: "groupName" },
          { title: "lecturer 1", field: "lecturer1_name" },
          { title: "lecturer 2", field: "lecturer2_name" },
          { title: "total Votes", field: "totalVotes" },
          { title: "vote lecturer 1", field: "percentageVoted1" },
          { title: "vote lecturer 2", field: "percentageVoted2" },
        ]}
        data={survey}
        // editable={{
        //   onRowAdd: async newData => {
        //     const result = survey.find(({ email }) => email === newData.email);
        //     if (result) {
        //       alert("The email is already exist");
        //       return;
        //     }

        //     await insertRow(newData);
        //     await refreshData();
        //   },
        //   onRowUpdate: async (newData, oldData) => {
        //     if (newData.email !== oldData.email) {
        //       const result = survey.guests.find(
        //         ({ email }) => email === newData.email
        //       );
        //       if (result) {
        //         alert("The email is already exist");
        //         return;
        //       }
        //     }

        //     await updateRow(newData);
        //     await refreshData();
        //   },
        //   onRowDelete: async oldData => {
        //     await deleteRow(oldData);
        //     await refreshData();
        //   }
        // }}
      />
    </Wrapper>
  );
}
