import { useState, useEffect } from "react";

const languages = {
  'en': {
    title: 'Users',
    btnCreateUser: 'Create new user',
    select: {
      type: 'en',
      english: 'English',
      spanish: 'Spanish'
    },
    form: {
      'create': {
        title: 'New user',
        labelName: ['First name', 'Last name', 'Email', 'Password', 'Birthday'],
        button: 'Add new user',

      },
      'update': {
        title: 'Update user',
        labelName: ['First name', 'Last name', 'Email', 'Password', 'Birthday'],
        button: 'Update'
      }
    },
    deleteUser: {
      title: 'Delete user',
      content: ['The user', 'will be deleted, are you sure you want to delete this user?'],
      button: 'Accept'
    },
    userName: 'That username already exists.',
    gmail: 'That email already exists.',
    password: 'That password already exists.',
    noChange: 'No change has been made.',
    card: {
      email: 'Mail',
      birthday: 'Birthday' 
    }
  },
  'es': {
    title: 'Usuarios',
    btnCreateUser: 'Crear nuevo usuario',
    select: {
      type: 'es',
      english: 'Inglés',
      spanish: 'Español'
    },
    form: {
      'create': {
        title: 'Nuevo usuario',
        labelName: ['Nombre', 'Apellido', 'Coreo', 'Contraseña', 'Cumpleaños'],
        button: 'Agregar nuevo usuario',
      },
      'update': {
        title: 'Actualizar usuario',
        labelName: ['Nombre', 'Apellido', 'Coreo', 'Contraseña', 'Cumpleaños'],
        button: 'Actualizar'
      }
    },
    deleteUser: {
      title: 'Eliminar usuario',
      content: ['El usuario', 'será eliminado, ¿estás seguro de que deseas eliminar este usuario?'],
      button: 'Aceptar'
    },
    userName: 'Ese nombre de usuario ya existe.',
    gmail: 'Ese correo ya existe.',
    password: 'Esa contraseña ya existe.',
    noChange: 'No se ha realizado ningún cambio.',
    card: {
      email: 'Coreo',
      birthday: 'Cumpleaños' 
    }
  }
}
export default function useLanguage(value){
  const  [language, setLanguage] = useState(languages['en'])
  useEffect(()=> {
    setLanguage(languages[value])
  }, [value])
  return language
}