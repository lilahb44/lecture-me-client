import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import { responsiveFontSizes } from "@material-ui/core";

export default function CreateSurvey({ token }) {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState();
  const [lecturers, setLecturers] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedLecturer1, setSelectedLecturer1] = useState();
  const [selectedLecturer2, setSelectedLecturer2] = useState();

  const fetchData = () => {
    fetch(`https://lecture-me.herokuapp.com/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => setGroups(data));

    fetch(`https://lecture-me.herokuapp.com/lecturers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => setLecturers(data));
  };

  const handleClickOpen = () => {
    fetchData();
    setOpen(true);
  };

  const send = () => {
    if (selectedLecturer1 === selectedLecturer2)
      return alert("You must choose two diffrent lecturers.");

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setGroups(null);
    setLecturers(null);
  };

  if (!open)
    return (
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create New Survey
      </Button>
    );

  if (!groups || !lecturers) return <div>Loading...</div>;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New survey</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create new survey, please enter name of group and two lecturers
          here. We will send this survey to your guests.
        </DialogContentText>

        <TextField
          select
          label="Group Name"
          margin="dense"
          fullWidth
          value={selectedGroup}
          required
          onChange={(event) => setSelectedGroup(event.target.value)}
        >
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </TextField>
        <TextField
          select
          id="selected1"
          label="Lecturer 1"
          margin="dense"
          fullWidth
          value={selectedLecturer1}
          required
          onChange={(event) => setSelectedLecturer1(event.target.value)}
        >
          {lecturers.map((l) => (
            <option key={l.id} value={l.id}>
              {l.lecturer_name}
            </option>
          ))}
        </TextField>
        <TextField
          select
          id="selected2"
          label="Lecturer 2"
          margin="dense"
          fullWidth
          value={selectedLecturer2}
          required
          onChange={(event) => setSelectedLecturer2(event.target.value)}
        >
          {lecturers.map((l) => (
            <option key={l.id} value={l.id}>
              {l.lecturer_name}
            </option>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={send} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
