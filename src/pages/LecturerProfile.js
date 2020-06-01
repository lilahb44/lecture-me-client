import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
  max-width: 1400px;
  margin-top: 80px;
`;
const Grid = styled.div``;
const LeftColumn = styled.div``;
const RightColumn = styled.div``;
const MiddleColumn = styled.div``;
const Name = styled.h2`
  font-weight: bold;
`;

const Card2 = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
const SubHeader = styled.h2`
  width: auto;
  border-bottom: solid 2px #f9bc0f;
  margin: auto;
  margin-bottom: 20px;
  padding: 15px;
`;
const DishTitle = styled.h3`
  width: auto;
  border-bottom: dashed 2px grey;
  margin: auto;
  margin-bottom: 20px;
  padding: 15px;
  color: black;
`;

/* Add a card effect for articles */

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
export default function LecturerProfile({ token }) {
  let { id } = useParams();
  const [date, setDate] = useState(new Date(2020, 10, 24, 18, 15));
  const [group, setGroup] = useState();
  const [groups, setGroups] = useState();
  const [address, setAddress] = useState();
  const [lecturer, setLecturer] = useState();

  const fetchData = () => {
    fetch(`https://lecture-me.herokuapp.com/userApi/lecturers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((lecturer) => setLecturer(lecturer));

    fetch(`https://lecture-me.herokuapp.com/userApi/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => setGroups(data));
  };

  const classes = useStyles();

  useEffect(() => {
    fetchData();
  }, [token]);

  if (!groups || !lecturer) return <div>Loading...</div>;

  //when fill an order in LecturerProfile
  const createOrder = async (event) => {
    event.preventDefault();

    await fetch(`https://lecture-me.herokuapp.com/userApi/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        groupId: group,
        lecturerId: lecturer.id,
        date: date,
        address: address,
        price: lecturer.price,
      }),
    })
      .then((res) => res.json())
      .then(alert("your request has been sent to lecturer"));
  };

  return (
    // <!-- Page Container -->
    <Wrapper className="w3-container w3-content w3-center">
      {/* <!-- The Grid --> */}
      <Grid className="w3-row">
        {/* <!-- Left Column --> */}
        <LeftColumn className="w3-col m4">
          {/* <!-- Profile --> */}
          <Card2>
            <Name className="w3-center">{lecturer.lecturer_name}</Name>
            <div className={classes.root}>
              <Avatar src="/broken-image.jpg" className={classes.large} />
            </div>

            <Card2>
              <h3>Catagory</h3>
              <h5>{lecturer.catagory}</h5>
            </Card2>
            <Card2>
              <h3>Price</h3>
              <h5>{lecturer.price}</h5>
            </Card2>
          </Card2>
        </LeftColumn>
        {/* <!-- Middle Column --> */}
        <MiddleColumn className="w3-col m4">
          <Card2>
            <SubHeader>The Lecture</SubHeader>
            <DishTitle>Free Your Mind</DishTitle>
            <p>
              The best prohibitions had to deal with them. What is the stress
              response? What happens in the brain and body when the reaction is
              triggered? Have smartphones taken over our minds? When does
              technology produce stress and how is it legal about the work
              environment? The effects of technology on humans will put us in
              order. You will receive practical tools, organizational workers,
              how to create a healthier work environment and increase
              organizational empathy.
            </p>
          </Card2>
          <Card2>
            <SubHeader>Rates</SubHeader>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star "></span>
          </Card2>
        </MiddleColumn>

        {/* <!-- Right Column --> */}

        <RightColumn className="w3-col m4">
          <Card2>
            <SubHeader>Book this experience</SubHeader>
            <Card2>
              <form onSubmit={createOrder}>
                <h2>Date&Time</h2>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="datetime-local"
                  label="Date"
                  type="datetime-local"
                  margin="normal"
                  defaultValue="2020-08-10T18:30"
                  className={classes.container}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                ></TextField>

                <h2>Group Name</h2>
                <TextField
                  select
                  variant="outlined"
                  label="Group Name"
                  margin="dense"
                  fullWidth
                  value={group}
                  required
                  onChange={(event) => setGroup(event.target.value)}
                >
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </TextField>
                <h2>Address</h2>
                <TextField
                  variant="outlined"
                  type="text"
                  required
                  fullWidth
                  id="address"
                  label="address"
                  name="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                ></TextField>

                <div>
                  <br></br>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Send Request
                </Button>
              </form>
            </Card2>
          </Card2>
        </RightColumn>
      </Grid>
    </Wrapper>
  );
}
