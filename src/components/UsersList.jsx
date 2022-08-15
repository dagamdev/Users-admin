import React from "react";
import useCrud from "../hooks/useCrud";

function UsersList({user, setUsers, setForm}){
   function deleteUser(event){
      function accept(){
         useCrud().deleteUser(`https://users-crud1.herokuapp.com/users/${user.id}/`, ()=> useCrud().read('https://users-crud1.herokuapp.com/users/', setUsers))
      }
      setForm({id: user.id, title: 'Update user', firstName: user.first_name, lastName: user.last_name, email: user.email, password: user.password, birthday: user.birthday, button: 'Update', content: (
         <>
            <h2>Delete user</h2>
            <p>The user <span>{`${user.first_name} ${user.last_name}`}</span> will be deleted, are you sure you want to delete this user?</p>
            <button onClick={accept}>Accept</button>
            <div onClick={()=> setForm(false)} className="to_close">
               <i className="fi fi-br-cross"></i>
            </div>
         </>
      )})
      
   }
   function updateUser(event){
      setForm({id: user.id, title: 'Update user', firstName: user.first_name, lastName: user.last_name, email: user.email, password: user.password, birthday: user.birthday, button: 'Update'})
      // console.log(event.target.parentNode.parentNode.dataset.id)
   }
   return (
      <div className="user">
         <h3>{`${user.first_name} ${user.last_name}`}</h3>
         <div className="user_data">
            <p><span className="user_data-title">Mail:</span> <span><i className="fi fi-br-envelope"> </i>{user.email}</span></p>
            <p><span className="user_data-title">Birthday:</span> <span><i className="fi fi-br-gift"> </i>{user.birthday}</span></p>
         </div>
         <div className="user_options" data-id={user.id}>
            <button onClick={deleteUser} className="btn-delete"><i className="fi fi-br-trash"></i></button>
            <button onClick={updateUser} className="btn-update"><i className="fi fi-br-pencil"></i></button>
         </div>
      </div>
   )
}
export default UsersList