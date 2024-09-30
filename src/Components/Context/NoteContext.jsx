import axios from 'axios'
import React, { createContext } from 'react'
export let noteContext=createContext(0)


async function addNote(values) {
  return axios.post('https://note-sigma-black.vercel.app/api/v1/notes',values,{headers:{
    token:'3b8ny__'+localStorage.getItem('token')
  }}).then(({data})=>data).catch(err=>err)
  
}

async function getAllNotesForUser() {
  return axios.get('https://note-sigma-black.vercel.app/api/v1/notes',{headers:
    {token:'3b8ny__'+localStorage.getItem('token')}
  }).then(({data})=>data).catch(err=>err)
  
}


async function deleteNote(id) {
  return axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{headers:{
    token:'3b8ny__'+localStorage.getItem('token')
  }}).then(({data})=>data).catch(err=>err)
  
}

async function updateNote(id,values) {
  return axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,values,{headers:{
    token:'3b8ny__'+localStorage.getItem('token')
  }}).then(({data})=>data).catch(err=>err)
  
}
export default function NoteContextProvider({children}) {
  return <noteContext.Provider value={{addNote,getAllNotesForUser,deleteNote,updateNote}}>
    {children}
  </noteContext.Provider>
}
