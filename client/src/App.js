import Home from "./components/Home";
import NavBar from "./components/NavBar";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./higher_order_component/PrivateRoute";
import UnPrivateRoute from "./higher_order_component/UnPrivateRoute";
import EmailVerifyRoute from "./higher_order_component/EmailVerifyRoute";

import Protect1 from "./components/protected/Protect1";
import Protect2 from "./components/protected/Protect2";
import Admin from "./components/protected/Admin";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import EmailVerify from "./components/auth/EmailVerify";
import ActivateAcc from "./components/auth/ActivateAcc";



function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />  
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/user/activate/:activationToken" component={ActivateAcc} />

          <PrivateRoute path="/protect1" role={["user", "admin"]} component={Protect1}/>
          <PrivateRoute path="/protect2" role={["user", "admin"]} component={Protect2}/>
          <PrivateRoute path="/admin" role={["admin"]} component={Admin} />
          <EmailVerifyRoute path="/email/verify" component={EmailVerify} />

          <UnPrivateRoute path="/login" component={Login} />
          <UnPrivateRoute path="/register" component={Register} />
          <UnPrivateRoute path="/forgotPassword" component={ForgotPassword} />
          <UnPrivateRoute path="/user/resetPassword/:resetToken" component={ResetPassword} />

          {/* 404 page*/}
          <Route path="*" render={()=><h1 className="text-center">Page not Found</h1>} />
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
