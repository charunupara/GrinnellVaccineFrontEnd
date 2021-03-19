import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { zips } from "./iowaZipcodes";
import "./Update.css";

export default function Update() {
  const { emailToken } = useParams();
  const [zipcode, setZipcode] = useState("");
  const [radius, setRadius] = useState("");

  useEffect(() => {
    setInitialInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailToken);
    const matchedZip = zips.filter(
      (a) => a.fields.zip === zipcode
    )[0];
    console.log(matchedZip);
    if (matchedZip === undefined) {
      alert("Invalid zipcode!");
      window.location = "https://www.grinnellvaccine.tech/";
      return false;
    }
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(
        "https://grinnellvaccine-server.herokuapp.com/" + emailToken,
        {
          body: JSON.stringify({ zipcode, radius }),
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Successfully updated. Stay safe!");
      window.location = "https://www.grinnellvaccine.tech";
    } catch (err) {
      console.log(err);
    }
  };

  const setInitialInfo = async () => {
    try {
      const res = await fetch(
        "https://grinnellvaccine-server.herokuapp.com/" + emailToken
      );
      const resJSON = await res.json();
      console.log(resJSON);
      setZipcode(resJSON.zipcode);
      setRadius(resJSON.radius);
    } catch (err) {
      console.log(err);
    }
  };

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  return (
    <>
      <p>
        Add/update your preferences to get more accurate email alerts. We will
        only send you an email if appointments open up within your preferred
        distance.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          5-digit Zipcode
          <input
            type="text"
            required={true}
            onChange={handleZipcodeChange}
            value={zipcode}
            pattern="[0-9]{5}"
            placeholder="Zipcode"
          />
        </label>
        <label>
          Max distance (1-400 miles)
          <input
            type="number"
            required={true}
            max={400}
            onChange={handleRadiusChange}
            value={radius}
            min={1}
            placeholder="Max distance"
          />
        </label>
        <input type="submit" value="Confirm" />
      </form>
    </>
  );
}
