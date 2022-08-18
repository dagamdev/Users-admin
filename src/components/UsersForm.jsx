import React from "react";
import useCrud from "../hooks/useCrud";

export default function UsersForm({form, setForm, users, setUsers, setWarning, language}){
   function submitForm(event){
      event.preventDefault()
      if(event.target.firstName){
         const firstName = event.target.firstName.value
         const lastName = event.target.lastName.value
         const email = event.target.email.value
         const password = event.target.password.value
         const birthday = event.target.birthday.value

         if(form.id){
            if(users.some(s=> s.first_name.toLowerCase() == firstName.toLowerCase()) && users.some(s=> s.last_name.toLowerCase() == lastName.toLowerCase()) && users.some(s=> s.email.toLowerCase() == email.toLowerCase()) && users.some(s=> s.password.toLowerCase() == password.toLowerCase()) && users.some(s=> s.birthday.toLowerCase() == birthday.toLowerCase())) return setWarning({active: true, text: language.noChange})
            useCrud().updateUser(`https://users-crud1.herokuapp.com/users/${form.id}/`, {
               'first_name': firstName, 
               'last_name': lastName, 
               email: email, 
               password: password, 
               birthday: birthday
            }, ()=> useCrud().read('https://users-crud1.herokuapp.com/users/', setUsers))
         }else{
            console.log(email.toLowerCase())
            // console.log()
            if(users.some(s=> s.first_name.toLowerCase() == firstName.toLowerCase()) && users.some(s=> s.last_name.toLowerCase() == lastName.toLowerCase())) return setWarning({active: true, text: language.userName})
            if(users.some(s=> s.email.toLowerCase() == email.toLowerCase())) return setWarning({active: true, text: language.gmail})
            if(users.some(s=> s.password.toLowerCase() == password.toLowerCase())) return setWarning({active: true, text: language.password})
            
            useCrud().createUser('https://users-crud1.herokuapp.com/users/', {
               'first_name': firstName, 
               'last_name': lastName, 
               email: email, 
               password: password, 
               birthday: birthday
            }, ()=> useCrud().read('https://users-crud1.herokuapp.com/users/', setUsers))
         }
      }
      setForm(false)
   }

   // console.log(form.type)
   // console.log(language.form)
   const formLang = language.form[form.type]
   console.log(formLang)

   return (
      <div className="user-form">
         <form onSubmit={submitForm}>
            {form.content || (
            <>
               <h2 className="add">{formLang.title}</h2>
               <div>
                  <label htmlFor="firstName">{formLang.labelName[0]}</label>
                  <input type="text" id="firstName" maxLength={100} placeholder="User first name" defaultValue={form.firstName} required />
               </div>
               <div>
                  <label htmlFor="lastName">{formLang.labelName[1]}</label>
                  <input type="text" id="lastName" maxLength={100} placeholder="User last name" defaultValue={form.lastName} required />
               </div>
               <div>
                  <label htmlFor="email">{formLang.labelName[2]}</label>
                  <input type="email" id="email" maxLength={100} placeholder="User email" defaultValue={form.email} required />
               </div>
               <div>
                  <label htmlFor="password">{formLang.labelName[3]}</label>
                  <input type="password" id="password" maxLength={100} placeholder="User password" defaultValue={form.password} required />
               </div>
               <div>
                  <label htmlFor="birthday">{formLang.labelName[4]}</label>
                  <input type="date" id="birthday" maxLength={100} defaultValue={form.birthday} required />
               </div>
               <button>{formLang.button}</button>
               <div onClick={()=> setForm(false)} className="to_close">
                  <i className="fi fi-br-cross"></i>
               </div>
            </>)}
         </form>
      </div>
   )
}