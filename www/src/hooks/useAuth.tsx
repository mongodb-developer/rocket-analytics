import React, { useState, createContext, useContext, useEffect } from "react";
import * as Realm from "realm-web";

// Create the context
const AuthContext = createContext(null);

const app = Realm.getApp("event0-beta-xjvwy");

export const AuthProvider = ({ children }) => {
   const [authed, setAuthed] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(true);

   const [avatarURL,setAvatarURL] = useState<string>("");

   const vote = async function(email){
      await app.currentUser.functions.vote(email);
      //refresh data

   }

   async function loginEmailPassword(email:string, password:string) {
      // Create an e-mail/pwd credential
      const credentials = Realm.Credentials.emailPassword(email, password);
      try {
         // Authenticate the user
         const user = await app.logIn(credentials);
         return user
      } catch(err) {
         console.error("Failed to log in", err);
      }
   }
   async function registerEmailPassword(email:string, password:string) {
      try {
         // Authenticate the user
         await app.emailPasswordAuth.registerUser({ email, password });
         return true;
      } catch(err) {
         console.error("Failed to log in", err);
      }
   }
   const tryToLogin = async function(loginEmail:string,loginEmailPwd:string){
      try{
        const realmUser = await loginEmailPassword(loginEmail,loginEmailPwd);
        return realmUser;
      }catch(e){
        // TODO: double login does not trigger an error. find out how to track auth status elegantly
        console.log('e-login',e);
        return false;
      }
    };
    const tryToRegister = async function(loginEmail:string,loginEmailPwd:string){
      try{
        const realmUser = await registerEmailPassword(loginEmail,loginEmailPwd);
        return realmUser;
      }catch(e){
        // TODO: double login does not trigger an error. find out how to track auth status elegantly
        console.log('e-login',e);
        return false;
      }
    };
   useEffect(() => {
      setLoading(false);
   }, []);

   const login = async (email:string,pwd:string): Promise<void> => {
      const result = await tryToLogin(email,pwd);
      if (result) {
         console.log("user has logged in",result);
         setAuthed(true);
         sessionStorage.setItem("_token", String(result['_accessToken']));
      }
   };
   const register = async (email:string,pwd:string): Promise<void> => {
      const result = await tryToRegister(email,pwd);
      if (result) {
         console.log('registered succeeded')
      }else{
         console.log('register failed');
      }
      let loginResult = await tryToLogin(email,pwd);
      if(loginResult){
         //alert('success!')
         console.log("user has logged in",loginResult);
         setAuthed(true);
         sessionStorage.setItem("_token", String(loginResult['_accessToken']));
         setAvatarURL("https://avatars.dicebear.com/api/bottts/mdbworld-"+encodeURIComponent(loginResult['id'])+".svg");

         await app.currentUser.refreshCustomData();
         let customUserData = app.currentUser.customData;
         console.log(customUserData,'customUserData');
         if(!customUserData['avatarURL']){
            app.currentUser.functions.initUser(email,"https://avatars.dicebear.com/api/bottts/mdbworld-"+encodeURIComponent(loginResult['id'])+".svg")
         }
      }else{
         alert('user already exists. invalid email/pwd combo.');
         console.log(loginResult)
      }
   };

   const logout = async (): Promise<void> => {
      setAuthed(false);
      console.log("The User has logged out");
      sessionStorage.setItem("_token", "");
   };

   const getCustomData = async (): Promise<any> =>{
      return app.currentUser.customData;
   };

   return (
      // Using the provider so that ANY component in our application can
      // use the values that we are sending.
      <AuthContext.Provider
         value={{ authed, setAuthed, register, logout, vote, avatarURL, getCustomData, loading }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
