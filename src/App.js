import Home from "./Home";
import Unsubscribe from "./Unsubscribe";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/unsubscribe/:emailToken" component={Unsubscribe} />
      </Router>
    </>
  );
}

export default App;
