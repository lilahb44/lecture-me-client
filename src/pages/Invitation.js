import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useQueryParams from "../hooks/useQueryParams";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  /* justify-content: center; */
  background-color: #f9f5f2;
  flex-direction: wrap;
`;
const ChoicesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const CardStyled = styled.div`
  margin: 20px;
  width: 180px;
`;

const Content = styled.h4`
  text-align: center;
`;

const Invitation = () => {
  const [selectedValue, setSelectedValue] = useState("1");
  // const [choice, setChoice] = useState();
  // const queryParams = useQueryParams();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // const refreshData = () =>
  //   fetch(`https://lecture-me.herokuapp.com/lecturerApi/invitation`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + queryParams.get("lecturerToken"),
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((vote) => setChoice(vote));

  // useEffect(() => {
  //   refreshData();
  // }, []);

  //   if (!choice) return <div>Loading...</div>;

  //   const isVoted = () =>
  //     fetch(`https://lecture-me.herokuapp.com/lecturerApi/invitation`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + queryParams.get("lecturerToken"),
  //       },
  //       body: JSON.stringify({
  //         isVoted: selectedValue,
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then(() => alert("Thank you for replying"));

  return (
    <Wrapper>
      <h1>Invitation Details</h1>
      <br />
      <Content>
        Please see below invitation details.
        <br />
        press Accept or Decline
      </Content>
      <ChoicesWrapper>
        <CardStyled>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Accept </Typography>
            </CardContent>
            <CardActions>
              <Radio
                checked={selectedValue === "1"}
                onChange={handleChange}
                value="1"
                name="radio-button-demo"
              />
            </CardActions>
          </Card>
        </CardStyled>
        <CardStyled>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Decline </Typography>
            </CardContent>
            <CardActions>
              <Radio
                checked={selectedValue === "0"}
                onChange={handleChange}
                value="0"
                name="radio-button-demo"
              />
            </CardActions>
          </Card>
        </CardStyled>
      </ChoicesWrapper>
      {/* <Button variant="contained" color="primary" onClick={isVoted}>
        Send
      </Button> */}
    </Wrapper>
  );
};

export default Invitation;
