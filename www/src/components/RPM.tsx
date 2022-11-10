import React from "react";

declare global {
   interface HTMLElement {
      contentWindow?: any; //required for iframe integration with RPM
   }
}
function RPM() {
   const [avatarURL,setAvatarURL] = React.useState("");
   const [avatarAlias,setAvatarAlias] = React.useState("");
   const [isVisible,setRPMVisible] = React.useState(true);

   React.useEffect(()=>{    
      //RPM integration
      window.removeEventListener('message', subscribe);
      window.addEventListener('message', subscribe, { passive: true });
      return () => window.removeEventListener('message', subscribe); //cleanup when unmount
   },[])

   React.useEffect(()=>{
      // if avatarAlias is changing - the GLB has been generated
      //now - let's push it up to MongoDB using GraphQL
      if(sessionStorage.getItem('_token') && avatarAlias != "" && avatarURL != ""){
        const options = {
            method: "post",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+sessionStorage.getItem('_token')
            },
            body: JSON.stringify({
            query: insertAvatar()
            })
        };
      
        fetch(`__GRAPHQL_ENDPOINT__`, options)
            .then(res => res.json())
            .then((x)=>{
              console.log('x.data',x.data);
              alert('insert completed!')
        });
      }
   },[avatarURL])

   const insertAvatar = () => `mutation { insertOneAvatar( data:{ partition_id:"GLOBAL", display_name:"${avatarAlias}", glb:"${avatarURL}" } ) { _id display_name glb partition_id } }`

   const subscribe = function(event) {
      const json = parse(event);

      if (json?.source !== 'readyplayerme') {
        return;
      }

      // Susbribe to all events sent from Ready Player Me once frame is ready
      if (json.eventName === 'v1.frame.ready') {
         document.getElementById('frame').contentWindow.postMessage(
          JSON.stringify({
            target: 'readyplayerme',
            type: 'subscribe',
            eventName: 'v1.**'
          }),
          '*'
        );
      }

      // Get avatar GLB URL
      if (json.eventName === 'v1.avatar.exported') {
        console.log(`Avatar URL: ${json.data.url}`);
        //document.getElementById('avatarUrl').innerHTML = `Avatar URL: ${json.data.url}`;
        //document.getElementById('frame').hidden = true;
        let alias = prompt("What is the alias for this avatar going to be?");
        setAvatarAlias(alias);
        setRPMVisible(false);
        setAvatarURL(json.data.url);
      }

      // Get user id
      if (json.eventName === 'v1.user.set') {
        console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
      }
    }

    function parse(event) {
      try {
        return JSON.parse(event.data);
      } catch (error) {
        return null;
      }
    }

    return <div className="rpm-content">
               <div>
                  { isVisible && 
                     <div>
                        <iframe id="frame" className="frame" allow="camera *; microphone *" src="https://demo.readyplayer.me/avatar?frameApi"></iframe>
                     </div>
                  }
               </div>
         </div>;
}

export default RPM;
