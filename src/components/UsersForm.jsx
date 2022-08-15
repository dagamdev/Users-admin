import React from "react";
import useCrud from "../hooks/useCrud";

function UsersForm({form, setForm, setUsers}){
   function submitForm(event){
      event.preventDefault()
      if(form.id){
         useCrud().updateUser(`https://users-crud1.herokuapp.com/users/${form.id}/`, {
            'first_name': event.target.firstName.value, 
            'last_name': event.target.lastName.value, 
            email: event.target.email.value, 
            password: event.target.password.value, 
            birthday: event.target.birthday.value
         }, ()=> useCrud().read('https://users-crud1.herokuapp.com/users/', setUsers))
      }else{
         useCrud().createUser('https://users-crud1.herokuapp.com/users/', {
            'first_name': event.target.firstName.value, 
            'last_name': event.target.lastName.value, 
            email: event.target.email.value, 
            password: event.target.password.value, 
            birthday: event.target.birthday.value
         }, ()=> useCrud().read('https://users-crud1.herokuapp.com/users/', setUsers))
      }
      setForm(false)
   }

   return (
      <div className="user-form">
         <form onSubmit={submitForm}>
            {form.content || (
            <>
               <h2 className="add">{form.title}</h2>
               <div>
                  <label htmlFor="firstName">First name</label>
                  <input type="text" id="firstName" placeholder="User first name" defaultValue={form.firstName} required />
               </div>
               <div>
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" id="lastName" placeholder="User last name" defaultValue={form.lastName} required />
               </div>
               <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="User email" defaultValue={form.email} required />
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="User password" defaultValue={form.password} required />
               </div>
               <div>
                  <label htmlFor="birthday">Date</label>
                  <input type="date" id="birthday" defaultValue={form.birthday} required />
               </div>
               <button>{form.button}</button>
               <div onClick={()=> setForm(false)} className="to_close">
                  <i className="fi fi-br-cross"></i>
               </div>
            </>)}
         </form>
      </div>
   )
}
export default UsersForm