import React from "react";
import imgEn from "../assets/english.png"
import imgEs from "../assets/spanish.png"

export default function SelectLanguage({language, setLang}){
  function openSelect(){ // Abre o cierra las opciones de lenguaje
    document.querySelector(".select-language").classList.toggle("open-select")
  }

  function select(event){ // Para selecionar un lenguaje
    const lang = undefined
    if(event.target.classList.contains("select-option")){
      lang = event.target.dataset.language
    }else{
      lang = event.target.parentNode.dataset.language
    }
    setLang(lang)
  }

  return (
    <div  onClick={openSelect} className="select-language">
      <div className="selected">
        <img src={language.type == 'en' ? imgEn : imgEs} alt={language.type == 'en' ? language.english : language.spanish} />
        <p>{language.type == 'en' ? language.english : language.spanish}</p>
        <i className="fi fi-br-angle-left"></i>
      </div>

      <div className="select">
        <div onClick={select} className="select-option en" data-language="en">
          <img src={imgEn} alt={language.english} />
          <p>{language.english}</p>
        </div>
        
        <div onClick={select} className="select-option es" data-language="es">
          <img src={imgEs} alt={language.spanish} />
          <p>{language.spanish}</p>
        </div>
      </div>
    </div>
  )
}