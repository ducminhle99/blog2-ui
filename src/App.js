import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import { Context } from "./context/Context";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write"
import ContactUs from "./pages/contactUs/ContactUs"


function App() {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/contact">
            <ContactUs />
          </Route>
          <Route path="/register">
            {user ? <Homepage /> : <Register />}
          </Route>
          <Route path="/login">
            {user ? <Homepage /> : <Login />}
          </Route>
          <Route path="/posts/:id">
            <Single />
          </Route>
          <Route path="/write">
            {user ? <Write /> : <Login />}
          </Route>
          <Route path="/settings">
            {user ? <Settings /> : <Login />}
          </Route>
        </Switch>
      </Router>

    </>
  );
}

export default App;
