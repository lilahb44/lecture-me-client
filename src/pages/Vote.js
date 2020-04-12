import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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

const Vote = () => {
  const [selectedValue, setSelectedValue] = useState("a");
  const [vote, setVote] = useState();
  const queryParams = useQueryParams();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const refreshData = () =>
    fetch(`https://lecture-me.herokuapp.com/votes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + queryParams.get("voterToken"),
      },
    })
      .then((response) => response.json())
      .then((vote) => setVote(vote));

  useEffect(() => {
    refreshData();
  }, []);

  if (!vote) return <div>Loading...</div>;

  return (
    <Wrapper>
      <h1>Survey</h1>
      <br />
      <Content>
        Please choose which of the lecturers would you like to invite.
        <br />
        The lecturer who receives the most votes will be invited.
      </Content>

      <ChoicesWrapper>
        <CardStyled>
          <Card>
            <CardContent>
              <Avatar src="/broken-image.jpg" />
              <Typography color="textSecondary">
                {vote.lecturer1_name}
              </Typography>
              <Typography variant="body2" component="p">
                about lecturer <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Radio
                checked={selectedValue === "a"}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
                inputProps={{ "aria-label": "A" }}
              />
            </CardActions>
          </Card>
        </CardStyled>
        <CardStyled>
          <Card>
            <CardContent>
              <Avatar src="/broken-image.jpg" />
              <Typography color="textSecondary">
                {vote.lecturer2_name}
              </Typography>
              <Typography variant="body2" component="p">
                about lecturer <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Radio
                checked={selectedValue === "b"}
                onChange={handleChange}
                value="b"
                name="radio-button-demo"
                inputProps={{ "aria-label": "B" }}
              />
            </CardActions>
          </Card>
        </CardStyled>
      </ChoicesWrapper>
      <Button variant="contained" color="primary">
        Send
      </Button>
    </Wrapper>
  );
};

export default Vote;
