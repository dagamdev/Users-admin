import { useState, useEffect } from 'react'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import useCrud from './hooks/useCrud'
import icon from './assets/iconCrud.png'
import './App.css'

function App() {
  const [users, setUsers] = useState(undefined)
  const [form, setForm] = useState(false)
   useEffect(()=>{
      useCrud().read('https://users-crud1.herokuapp.com/users/', setUsers)
   }, [])
   function createNewUser(){
      setForm({id: '', title: 'New user', firstName: '', lastName: '', email: '', password: '', birthday: '', button: 'Add new user'})
   }

   function darkMode(event){
      document.querySelector(".App").classList.toggle("darck")
      document.querySelector(".switch").classList.toggle("switch-active")
      // const switchEl = 
      if(switchBtn.classList.contains("active-btn")){

      }
   }

   return (
      <div className="App">
         <div className="header">
            <div className="header-title">
               <img src={icon} alt="" />
               <h1>Users</h1>
            </div>
            <div onClick={darkMode} className="switch">
               <i className="switch-icon fi fi-br-sun"></i>
               <i className="switch-icon fi fi-br-moon"></i>
               <div className="switch-btn"></div>
            </div>
            <button onClick={createNewUser}><i className="fi fi-br-plus"></i>Create new user</button>
         </div>
         <div className="users-list">
         {users?.map(user=> <UsersList key={Object.values(user).join("")} user={user} setUsers={setUsers} setForm={setForm} />)}
         </div>
         {!form || <UsersForm form={form} setForm={setForm} setUsers={setUsers} />}
      </div>
   )
}

export default App
