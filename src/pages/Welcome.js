import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Welcome(props) {
  const [user, setUser] = useState({});

  return (
    <div className="col-lg-8 offset-lg-2">
      <h1>Hi {user.firstName}!</h1>
      <p>blabla</p>
    </div>
  );
}
