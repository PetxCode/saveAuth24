import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./HomeScreen/HomeScreen";
import Home from "./NewMake/Home";
import "antd/dist/antd.css";
import HomeDesing from "./NewBuild/HomeDesing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppProvider } from "./NewBuild/ContextAPI/GlobalState";

function App() {
  return (
    <div>
      <AppProvider>
        <Router>
          <Switch>
            <center>
              <Route exact path="/" component={HomeDesing} />
            </center>
          </Switch>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
