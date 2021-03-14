import { useParams } from "react-router-dom";

export default function Unsubscribe() {
  const { emailToken } = useParams();

  const handleUnsubscribeClick = async () => {
    console.log(emailToken);
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(
        "https://grinnellvaccine-server.herokuapp.com/unsubscribe/" + emailToken
      );
      alert("Successfully unsubscribed. Stay safe!");
      window.location = "https://www.grinnellvaccine.tech/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <p>Are you sure you want to unsubscribe?</p>
      <button onClick={() => handleUnsubscribeClick()}>Confirm</button>
    </>
  );
}
