import Form from './Form';

function Home() {
  return (
    <div>
      <h1>Subscribe to receive updates on available COVID vaccines in Iowa</h1>
      <p>
          Enter your <strong>email</strong>, <strong>zipcode</strong>, and{" "}
          <strong>max travel distance</strong> below to receive updates on the
          availability of COVID vaccine appointments in Iowa.
        </p>
        <p>
          We will send you an alert when appointments are available within the
          max distance from your location.
        </p>
      <Form />
    </div>
   

  );
}

export default Home;
