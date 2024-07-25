import react from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []
  const [notes, setnotes] = useState(notesinitial);

  //get all notes
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },

    });
    const json=await response.json();
    setnotes(json);
  }



  //add note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note= await response.json();
    setnotes(notes.concat(note));
  }
  //delete note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
    });
    const json=response.json();
    const newnotes = notes.filter((note) => { return note._id !== id });
    setnotes(newnotes);
  }
  //edit note
  const editnote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

     const json= await response.json();
     let newnotes=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setnotes(newnotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote , getnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
