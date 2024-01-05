const ContentType={
     JSON:"application/json",
     MEDIA:"multipart/formdata"
}

function requestServer( method, path, contentType=ContentType.JSON, body, callbackFunc){
     let requestBody = {
          method: method,
          headers:{},
          credentials: "include",
     }
     if( body!=null ){
          if( contentType == ContentType.JSON ){
               console.log('its JSON');
               requestBody.headers["Content-Type"]=contentType
               requestBody.body = JSON.stringify(body)
          }else{
               requestBody.body = body
          }
     }

     fetch( process.env.REACT_APP_BACKEND_URL + path, requestBody)
     .then((response) => {
          response.json().then((data) => {
               if( response.status == 200 && data.code==0){
                    if( callbackFunc ){
                         callbackFunc(data, response)
                    }
               }else
               if( response.status >= 400 && response.status < 500 ){
                    // popup error code
               }else
               if( response.status >= 500 && response.status < 600 ){
                    // popup again & retry after some time?
               }else{
                    // do what?
               }
          })
     }).catch((err) => {
          console.error(err);
     })
};   


module.exports = {
     getAPI: (path, body=null, callbackFunc=null) => {
          requestServer( "GET", path, ContentType.JSON, body, callbackFunc)
     },
     postAPI: (path, body=null, callbackFunc=null) => {
          requestServer( "POST", path, ContentType.JSON, body, callbackFunc )
     },
     uploadMedia:(path, formData, callbackFunc=null)=>{
          requestServer( "POST", path, ContentType.MEDIA, formData, callbackFunc )
     },
     putAPI: () => { },
     deleteAPI: () => { },
}