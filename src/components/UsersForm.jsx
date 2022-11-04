import React from "react";
import useCrud from "../hooks/useCrud";
import { endPoint } from "../data.json"

export default function UsersForm({form, setForm, users, setUsers, setWarning, language}){
   function submitForm(event){
      event.preventDefault()
      if(event.target.firstName){ // En caso de que se encuante el imput con la id firstName se ejecuta lo demas a la vez eso indica que existen los demas inputs
         const firstName = event.target.firstName.value
         const lastName = event.target.lastName.value
         const email = event.target.email.value
         const password = event.target.password.value
         const birthday = event.target.birthday.value
         console.log({firstName})

         if(form.id){ // Si form.id contiene algo se ejecuta esto, eso indica que es un update, en caso contratrio que es un create
            if(users.some(s=> s.firstName.toLowerCase() == firstName.toLowerCase()) && users.some(s=> s.lastName.toLowerCase() == lastName.toLowerCase()) && users.some(s=> s.email.toLowerCase() == email.toLowerCase()) && users.some(s=> s.password.toLowerCase() == password.toLowerCase()) && users.some(s=> s.birthday.toLowerCase() == birthday.toLowerCase())) return setWarning({active: true, text: language.noChange})
            useCrud().updateUser(endPoint+`users/${form.id}/`, {
               firstName, 
               lastName, 
               email, 
               password, 
               birthday
            }, ()=> useCrud().read(endPoint+'users/', setUsers))
            
         }else{
            if(users.some(s=> s.firstName.toLowerCase() == firstName.toLowerCase()) && users.some(s=> s.lastName.toLowerCase() == lastName.toLowerCase())) return setWarning({active: true, text: language.userName})
            if(users.some(s=> s.email.toLowerCase() == email.toLowerCase())) return setWarning({active: true, text: language.gmail})
            if(users.some(s=> s.password.toLowerCase() == password.toLowerCase())) return setWarning({active: true, text: language.password})
            
            useCrud().createUser(endPoint+'users/', {
               firstName, 
               lastName, 
               email, 
               password, 
               birthday
            }, ()=> useCrud().read(endPoint+'users/', setUsers))
         }
      }
      setForm(false) // Se desactiva el formulario
   }

   function watchPasword(){ // Para ver o oculatar la contraseña
      const inputPassword = document.getElementById("password")
      if(inputPassword.type == "password"){
         inputPassword.type = "text"
      }else{
         inputPassword.type = "password"
      }
      document.querySelector(".password-eye").classList.toggle("fi-br-eye")
      document.querySelector(".password-eye").classList.toggle("fi-br-eye-crossed")
   }

   const formLang = language.form[form.type] // Obtiene un objeto con las partes del formulario al lenguaje elegido

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
                  <div className="password">
                     <input type="password" id="password" maxLength={100} placeholder="User password" defaultValue={form.password} required />
                     <i onClick={watchPasword} className="password-eye fi fi-br-eye-crossed"></i>
                  </div>
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