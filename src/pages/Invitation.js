import React, { useState } from "react";
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
  const [selectedStatus, setSelectedStatus] = useState(1);
  const queryParams = useQueryParams();

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const isReply = () =>
    fetch(`https://lecture-me.herokuapp.com/lecturerApi/invitation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + queryParams.get("lecturerToken"),
      },
      body: JSON.stringify({
        status: selectedStatus,
      }),
    })
      .then((response) => response.json())
      .then(() => alert("Thank you for replying"));

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
                checked={selectedStatus === 1}
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
                checked={selectedStatus === 0}
                onChange={handleChange}
                value="0"
                name="radio-button-demo"
              />
            </CardActions>
          </Card>
        </CardStyled>
      </ChoicesWrapper>
      <Button variant="contained" color="primary" onClick={isReply}>
        Send
      </Button>
    </Wrapper>
  );
};

export default Invitation;
