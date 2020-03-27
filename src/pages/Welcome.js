import React, { useState, useEffect } from "react";

export default function Welcome({ token }) {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`https://lecture-me.herokuapp.com/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    })
      .then(response => response.json())
      .then(userData => setUser(userData));
  }, [token]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="col-lg-8 offset-lg-2">
      <h1>Hi {user.firstName}!</h1>
    </div>
  );
}
