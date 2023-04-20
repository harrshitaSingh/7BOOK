import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { Button } from "react-bootstrap";
import "./MyRequestsScreen.css";
const MyRequestsScreen = () => {
  const alert = useAlert();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchMyRequests() {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        let fetch_requests = await axios.post("/api/myrequests", {}, config);
        if (loading) {
          const data = Array.from(fetch_requests.data);
          setLoading(false);
          setRequests(data);
        }
        console.log(fetch_requests.data);
      } catch (err) {
        const msg = err.response ? err.response.data.message : err;
        alert.show(msg, { type: "error" });
      }
    }
    fetchMyRequests();
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div>
      <h2 className="text-center">My Requests</h2>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div className="requestbox">
            <h3>
              Requested Post Title: <u>{request.postTitle}</u>{" "}
            </h3>

            <p>
              Request From:
              <Button variant="info" className="mx-4">
                {" "}
                {request.username}
              </Button>
            </p>
            <p>User Id of Request Sender: {request.user}</p>
          </div>
        ))
      ) : (
        <h3 classname="text-center">No Request Found</h3>
      )}
    </div>
  );
};

export default MyRequestsScreen;
