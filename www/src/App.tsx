import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Navigation from "./components/Navigation";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

function App() {
   const { authed, loading } = useAuth();

   return (
      <div className="App">
         <Navigation />
         {authed ? <Logout /> : <Login />}

         {loading ? (
            <div> Loading... </div>
         ) : (
            <>
               <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/dashboard" exact component={Profile} />
               </Switch>
            </>
         )}
      </div>
   );
}

export default App;
