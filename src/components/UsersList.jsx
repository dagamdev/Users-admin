import React from "react";
import useCrud from "../hooks/useCrud";
import { endPoint } from "../data.json" 

export default function UsersList({user, setUsers, setForm, language}){
   function deleteUser(){
      function accept(){ // Para eliminar el usuario y recargar de nuevo los usuarios
         useCrud().deleteUser(endPoint+`users/${user.id}/`, ()=> useCrud().read(endPoint+'users/', setUsers))
      }

      setForm({id: '', type: '', firstName: '', lastName: '', email: '', password: '', birthday: '', content: ( // Se actualizan los datos de form
         <>
            <h2>{language.deleteUser.title}</h2>
            <p>{language.deleteUser.content[0]} <span>{`${user.firstName} ${user.lastName}`}</span> {language.deleteUser.content[1]}</p>
            <button onClick={accept}>{language.deleteUser.button}</button>
            <div onClick={()=> setForm(false)} className="to_close">
               <i className="fi fi-br-cross"></i>
            </div>
         </>
      )})
      
   }

   function updateUser(){ // Se le pasan datos a form para actualizar el usuario
      setForm({id: user.id, type: 'update', firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, birthday: user.birthday.slice(0, 10), content: ''})
   }

   return (
      <div className="user">
         <h3>{`${user.firstName} ${user.lastName}`}</h3>
         <div className="user_data">
            <p><span className="user_data-title">{language.card.email}:</span> <span><i className="fi fi-br-envelope"> </i>{user.email}</span></p>
            <p><span className="user_data-title">{language.card.birthday}:</span> <span><i className="fi fi-br-gift"> </i>{user.birthday.slice(0, 10)}</span></p>
         </div>
         <div className="user_options" data-id={user.id}>
            <button onClick={deleteUser} className="btn-delete"><i className="fi fi-br-trash"></i></button>
            <button onClick={updateUser} className="btn-update"><i className="fi fi-br-pencil"></i></button>
         </div>
      </div>
   )
}