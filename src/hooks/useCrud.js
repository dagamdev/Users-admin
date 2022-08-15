import {useState, useEffect} from "react";

function useCrud(url, setData, body){
   function createUser(url, body, end){
      fetch(url, {
         method: 'POST', 
         body: JSON.stringify(body), 
         headers: {'Content-Type': 'application/json'}
      }).catch(error=> console.error(error)).finally(()=> end())
   }

   function read(url, setData){
      fetch(url).then(prom=> prom.json()).then(res=> setData(res)).catch(error=> console.error(error))
   }

   function updateUser(url, body, end){
      fetch(url, {
         method: 'PUT', 
         body: JSON.stringify(body), 
         headers: {'Content-Type': 'application/json'}
      }).catch(error=> console.error(error)).finally(()=> end())
   }

   function deleteUser(url, end){
      fetch(url, {method: 'DELETE'}).catch(error=> console.error(error)).finally(()=> end())
   }

   return {createUser, read, updateUser, deleteUser}
}
export default useCrud