import { useState, useEffect } from 'react'
import UsersList from './components/UsersList.jsx'
import UsersForm from './components/UsersForm.jsx'
import SelectLanguage from './components/SelectLanguage.jsx'
import useLanguage from './hooks/useLanguage.js'
import useCrud from './hooks/useCrud.js'
import icon from './assets/iconCrud.png'
import { endPoint } from "./data.json"
import './App.css'
import { OptionTitel } from './components/OptionTitle.jsx'

let localData = JSON.parse(localStorage.getItem("users-crud")) || false

function darkMode(){ // Para el modo oscuro
  document.querySelector(".App").classList.toggle("darck")
  document.querySelector(".switch").classList.toggle("switch-active")
  if(localData){
    if(localData.darkMode){
      localData.darkMode = false
    }else{
      localData.darkMode = true
    }
    localStorage.setItem("users-crud", JSON.stringify(localData))
  }else{
    localData.darkMode = true
    localStorage.setItem("users-crud", JSON.stringify({darkMode: true, language: "en"}))
  }
}

function App() {
  const [form, setForm] = useState(false) // Información para los formularios
  const [lang, setLang] = useState(localData ? localData.language : "en") // Lenguaje
  const language = useLanguage(lang)
  const [users, setUsers] = useState(undefined) // Obtener usuarios 
  const [warning, setWarning] = useState({active: false, text: undefined}) // Para el mensaje de advertencia

  useEffect(()=>{
    useCrud().read(endPoint+'users', setUsers)
  }, [])

  useEffect(()=> {
    if(localData){
      if(localData.language != lang){
        localData.language = lang
        localStorage.setItem("users-crud", JSON.stringify(localData))
      }
    }else{
      localStorage.setItem("users-crud", JSON.stringify({darkMode: false, language: lang}))
    }
  }, [lang])

  function createNewUser(){ 
    setForm({id: '', type: 'create', firstName: '', lastName: '', email: '', password: '', birthday: '', content: ''})
  }

  
  if(warning.active){ // Para el mensaje de advertencia
    document.querySelector(".warning").classList.add("warning-active")
    setTimeout(()=>{
      document.querySelector(".warning").classList.remove("warning-active")
      setWarning({active: false, text: warning.text})
    }, 6000)
  }

  return (
    <div className={localData.darkMode ? "App darck" : "App"}>
      <div className="warning">
        <p>⚠️ {warning.text}</p>
      </div>

      <div className="header">
        <div className="header-title">
          <img src={icon} alt="Logo" />
          <h1>{language?.title} {users?.length}</h1>
        </div>
        <div onClick={darkMode} className={localData.darkMode ? "switch switch-active" : "switch"}>
          <OptionTitel firstClass={'mode'} title={localData.darkMode ? language.mode.dark : language.mode.light} />
          <div className="switch_content-icons">
            <i className="switch-icon icon1 fi fi-br-sun"></i>
            <i className="switch-icon icon2 fi fi-br-moon"></i>
            <div className="switch-btn"></div>
          </div>
        </div>
        <SelectLanguage language={language?.select} setLang={setLang} />
        <button onClick={createNewUser}><i className="fi fi-br-plus"></i>{language?.btnCreateUser}</button>
      </div>

      <div className="users-list">
      {users?.map(user=> <UsersList key={Object.values(user).join("")} user={user} setUsers={setUsers} setForm={setForm} language={language} />)}
      </div>

      {!form || <UsersForm form={form} setForm={setForm} users={users} setUsers={setUsers} setWarning={setWarning} language={language} />}
    </div>
  )
}

export default App
