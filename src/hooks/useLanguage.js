import { useState, useEffect } from "react";
import { languages } from "../data.json"

export default function useLanguage(value){ // Devuelve el objeto con el lenguaje indicado
  const  [language, setLanguage] = useState(languages['en'])
  useEffect(()=> {
    setLanguage(languages[value])
  }, [value])
  return language
}