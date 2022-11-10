import React from "react";
import { useAuth } from "../hooks/useAuth";
import {Button} from "reactstrap";

function Logout() {
   const { logout,avatarURL } = useAuth();

   return (
      <div className="logout-section">
         
         <img src={avatarURL} style={{minWidth:"150px",maxWidth:"150px",margin:"0 auto"}}/>
         <Button color="danger" onClick={logout}>Logout</Button>
      </div>
   );
}

export default Logout;
