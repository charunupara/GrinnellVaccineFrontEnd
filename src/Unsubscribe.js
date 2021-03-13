import { useParams } from "react-router-dom";

export default function Unsubscribe() {
  const { emailToken } = useParams();

  const handleUnsubscribeClick = async () => {
    console.log(emailToken);
    try {
      const res = await fetch(
        "https://grinnellvaccine-server.herokuapp.com/unsubscribe/" + emailToken
      );
      const resJSON = res.data;
      if (resJSON.success) {
        alert(resJSON.success);
      }
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
