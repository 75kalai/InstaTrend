// import { useContext, useEffect } from "react";
// import { AppContext } from '../App';

const ContentType = {
     JSON: "application/json",
     MEDIA: "multipart/formdata"
}

function RequestServer(
     method,
     path,
     reqContentType = ContentType.JSON, // Request "Content-Type"
     resContentType = ContentType.JSON, // Response "Content-Type"
     body,
     callbackFunc
) {

     // let AppEnvironment = useContext( AppContext );

     let requestBody = {
          method: method,
          headers: {},
          credentials: "include",
     }
     if (body != null) {
          if (reqContentType == ContentType.JSON) {
               requestBody.headers["Content-Type"] = reqContentType
               requestBody.body = JSON.stringify(body)
          } else {
               requestBody.body = body
          }
     }

     fetch(process.env.REACT_APP_BACKEND_URL + path, requestBody)
          .then(async (response) => {
               if (resContentType == ContentType.JSON) {
                    response.json().then((data) => {
                         if (response.status == 200 && data.code == 0) {
                              if (callbackFunc) {
                                   callbackFunc(data, response)
                              }
                         } else if (response.status >= 400 && response.status < 500) {
                              // popup error code
                              if( !(window.location.pathname=="/" && path=="/api/v1/auth/me") ){
                                   window.alert( data.message )
                              }
                              if (data.code == 1004) {
                                   // User is not logged in
                                   // LOG OUT USER!
                                   if(window.location.pathname!="/"){
                                        window.location.pathname="/"
                                   }
                              }
                         } else if (response.status >= 500 && response.status < 600) {
                              // popup again & retry after some time?
                         } else {
                              // do what?
                         }
                    })
               } else if (resContentType == ContentType.MEDIA) {
                    if (callbackFunc) {
                         
                         var blobData = await response.blob();
                         const objectURL = URL.createObjectURL(blobData);
                         callbackFunc(objectURL, response)

                    } 
               }
          }).catch((err) => {
               console.error(err);
          });

     return null
};


export default {
     getAPI: (path, callbackFunc = null) => {
          RequestServer("GET", path, ContentType.JSON, ContentType.JSON, null, callbackFunc)
     },
     getMedia: (path, callbackFunc) => {
          RequestServer("GET", path, ContentType.JSON, ContentType.MEDIA, null, callbackFunc)
     },
     postAPI: (path, body = null, callbackFunc = null) => {
          RequestServer("POST", path, ContentType.JSON, ContentType.JSON, body, callbackFunc)
     },
     uploadMedia: (path, formData, callbackFunc = null) => {
          RequestServer("POST", path, ContentType.MEDIA, ContentType.JSON, formData, callbackFunc)
     },
     putAPI: (path, body = null, callbackFunc = null) => {
          RequestServer("PUT", path, ContentType.JSON, ContentType.JSON, body, callbackFunc)
     },
     deleteAPI: () => { },
}