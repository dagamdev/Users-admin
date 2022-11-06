import React from "react";
import imgEn from "../assets/english.png"
import imgEs from "../assets/spanish.png"
import { OptionTitel } from "./OptionTitle";

export default function SelectLanguage({language, setLang}){
  function openSelect(){ // Abre o cierra las opciones de lenguaje
    document.querySelector(".select-language").classList.toggle("open-select")
  }

  function select(event){ // Para selecionar un lenguaje
    if(event.target.classList.contains("select-option")){
      setLang(event.target.dataset.language)
    }else{
      setLang(event.target.parentNode.dataset.language)
    }
  }

  return (
    <div  onClick={openSelect} className="select-language">
      <OptionTitel firstClass={'language'} title={language.lenguage} />
      <div className="selected">
        <img src={language.select.type == 'en' ? imgEn : imgEs} alt={language.select.type == 'en' ? language.select.english : language.select.spanish} />
        <p>{language.select.type == 'en' ? language.select.english : language.select.spanish}</p>
        <i className="fi fi-br-angle-left"></i>
      </div>

      <div className="select">
        <div onClick={select} className="select-option en" data-language="en">
          <img src={imgEn} alt={language.select.english} />
          <p>{language.select.english}</p>
        </div>
        
        <div onClick={select} className="select-option es" data-language="es">
          <img src={imgEs} alt={language.select.spanish} />
          <p>{language.select.spanish}</p>
        </div>
      </div>
    </div>
  )
}