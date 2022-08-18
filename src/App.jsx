import { useState, useEffect } from 'react'
import UsersList from './components/UsersList.jsx'
import UsersForm from './components/UsersForm.jsx'
import SelectLanguage from './components/SelectLanguage.jsx'
import useLanguage from './hooks/useLanguage.js'
import useCrud from './hooks/useCrud.js'
import icon from './assets/iconCrud.png'
import './App.css'

function App() {
  const [form, setForm] = useState(false)
  const [users, setUsers] = useState(undefined)
  const [lang, setLang] = useState("en")
  const language = useLanguage(lang)
  const [warning, setWarning] = useState({active: false, text: undefined})

  // if(lang){
  //   const lll = useLanguage(lang)
  //   setLanguage(lll)
  //   setLang(false)
  // }

  useEffect(()=>{
    useCrud().read('https://users-crud1.herokuapp.com/users/', setUsers)
  }, [])
  function createNewUser(){
    setForm({id: '', type: 'create', firstName: '', lastName: '', email: '', password: '', birthday: '', button: 'Add new user'})
  }

  function darkMode(event){
    document.querySelector(".App").classList.toggle("darck")
    document.querySelector(".switch").classList.toggle("switch-active")
    // const switchEl = 
    if(switchBtn.classList.contains("active-btn")){

    }
  }

  if(warning.active){
    document.querySelector(".warning").classList.add("warning-active")
    setTimeout(()=>{
      document.querySelector(".warning").classList.remove("warning-active")
      setWarning({active: false, text: warning.text})
    }, 6000)

    // setTimeout(()=>{
    //   document.querySelector(".warning").classList.add("warning-active")
    //   setTimeout(()=>{
    //     document.querySelector(".warning").classList.remove("warning-active")
    //     setWarning({active: false, text: warning.text})
    //   }, 6000)
    // }, 800)
  }

  return (
    <div className="App">
      <div className="warning">
        <p>⚠️ {warning.text}</p>
      </div>
      <div className="header">
        <div className="header-title">
          <img src={icon} alt="Logo" />
          <h1>{language.title} {users?.length}</h1>
        </div>
        <SelectLanguage language={language.select} setLang={setLang} />
        <div onClick={darkMode} className="switch">
          <i className="switch-icon fi fi-br-sun"></i>
          <i className="switch-icon fi fi-br-moon"></i>
          <div className="switch-btn"></div>
        </div>
        <button onClick={createNewUser}><i className="fi fi-br-plus"></i>{language.btnCreateUser}</button>
      </div>
      <div className="users-list">
      {users?.map(user=> <UsersList key={Object.values(user).join("")} user={user} setUsers={setUsers} setForm={setForm} language={language} />)}
      </div>
      {!form || <UsersForm form={form} setForm={setForm} users={users} setUsers={setUsers} setWarning={setWarning} language={language} />}
    </div>
  )
}

export default App
