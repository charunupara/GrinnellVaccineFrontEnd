import Home from "./Home";
import Unsubscribe from "./Unsubscribe";
import Update from "./Update";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";

function App() {
  return (
    <>
      <HttpsRedirect>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/unsubscribe/:emailToken" component={Unsubscribe} />
          <Route path="/update/:emailToken" component={Update} />
        </Router>
      </HttpsRedirect>
    </>
  );
}

export default App;
