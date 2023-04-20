import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const ProfileScreen = ({ setProfileFilled }) => {
  let navigate = useNavigate();

  const genreList = [
    { id: "61f0132429cbf76c5b4c7ebf", text: "Adult Fiction" },
    { id: "61f0133329cbf76c5b4c7ec0", text: "Horror" },
    { id: "61f0133f29cbf76c5b4c7ec1", text: "Fiction" },
    { id: "61f0134629cbf76c5b4c7ec2", text: "Fantasy" },
    { id: "61f0134d29cbf76c5b4c7ec3", text: "Mystery" },
    { id: "61f0135529cbf76c5b4c7ec4", text: "Politics" },
    { id: "61f0135c29cbf76c5b4c7ec5", text: "Science Fiction" },
    { id: "61f0136329cbf76c5b4c7ec6", text: "Thriller" },
    { id: "61f0136b29cbf76c5b4c7ec7", text: "War" },
    { id: "61f0137329cbf76c5b4c7ec8", text: "Art" },
    { id: "61f0137929cbf76c5b4c7ec9", text: "Biography" },
    { id: "61f0138029cbf76c5b4c7eca", text: "Business" },
    { id: "61f0138829cbf76c5b4c7ecb", text: "Classics" },
    { id: "61f0138f29cbf76c5b4c7ecc", text: "Comics" },
    { id: "61f0139529cbf76c5b4c7ecd", text: "Contemporary" },
    { id: "61f013a029cbf76c5b4c7ece", text: "Cookbooks" },
    { id: "61f013a629cbf76c5b4c7ecf", text: "Crime" },
    { id: "61f013ad29cbf76c5b4c7ed0", text: "History" },
    { id: "61f013b629cbf76c5b4c7ed1", text: "Humor and Comedy" },
    { id: "61f013c129cbf76c5b4c7ed2", text: "Memoir" },
  ];

  const alert = useAlert();
  const [location, setLocation] = useState({
    place_name: "",
    latitude: null,
    longitude: null,
  });
  const [formData, setFormData] = useState({
    genre: "61f0132429cbf76c5b4c7ebf",
  });
  const submitUserProfile = async (e) => {
    e.preventDefault();
    try {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo);
      let res = await axios.post("/auth/profile", {
        location: location.place_name,
        latitude: location.latitude,
        longitude: location.longitude,
        user_id: userInfo._id,
        fav_genre: formData.genre,
      });
      if (res.status === 201) {
        setProfileFilled(true);
        navigate("/");
        alert.show("Profile Filled Successfully", { type: "success" });
      }
    } catch (err) {
      const msg = err.response ? err.response.data.message : err;
      alert.show(msg, { type: "error" });
    }
  };

  const getLocationFromText = async (e) => {
    e.preventDefault();
    if (formData.location.length > 0) {
      const loc = formData.location.replace(" ", "%20");

      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1IjoicmhhcnNoaXQ4MiIsImEiOiJja3lzdHZrZWsxN2x1MnFwdG5odDU0dDY4In0.Vzpw618KcpQyA3sPLPMpNQ&autocomplete=false&limit=1&country=IN&worldview=in`
      );
      setLocation({
        place_name: res.data.features[0].place_name,
        latitude: res.data.features[0].geometry.coordinates[1],
        longitude: res.data.features[0].geometry.coordinates[0],
      });
    }
  };

  return (
    <div id="mt">
      <h3 className="text-center">User Profile</h3>
      <Form className="w-50 m-auto text-center" onSubmit={submitUserProfile}>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </Form.Group>

        <Button
          style={{ marginTop: "1em", marginBottom: "1em" }}
          onClick={(e) => getLocationFromText(e)}
        >
          Get Location From Text
        </Button>
        {location.place_name && location.place_name.length > 0 ? (
          <div>
            <p>Your Location: {location.place_name}</p>
          </div>
        ) : null}

        <Form.Group controlId="genre">
          <Form.Label>Select your favourite genre</Form.Label>
          <Form.Select
            aria-label="genre"
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
          >
            {genreList.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.text}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

// export default ProfileScreen;
export default ProfileScreen;
