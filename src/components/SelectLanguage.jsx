import React, {useState, useEffect} from "react";
import imgEn from "../assets/english.png"
import imgEs from "../assets/spanish.png"
import useLanguage from "../hooks/useLanguage";

export default function SelectLanguage({language, setLang}){

  function openSelect(event){
    document.querySelector(".select-language").classList.toggle("open-select")
    console.log(event.target)
  }

  function select(event){
    if(event.target.classList.contains("select-option")){
      setLang(event.target.dataset.language)
    }else{
      setLang(event.target.parentNode.dataset.language)
    }
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