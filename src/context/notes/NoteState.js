import React, { useState } from 'react';
import NoteContext from './NoteContext';
const NoteState = (props) => {
    let host = "http://localhost:3500";
    const [notes, setNotes] = useState([]);


    //! Get all note    
    const getNotes = async () => {
        //API Call        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            }
        })
        let json = await response.json()
        setNotes(json);
    }



    //! Add a note    
    const addNote = async (title, description, tag) => {
        //API Call    
        await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag })
        })        
        //On client side      

        let note = {
            "_id": "63a44e1f544c5d1b89851c3ad5",
            "user": "63a3003d61887bdf9b882c12",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-12-22T12:31:27.614Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }


    //! Delete a note
    const deleteNote = async (id) => {
        //API Call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            },
        })
        //Client side method
        let newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes);
    }


    //! Edit a note
    const editNote = async (id, title, description, tag) => {
        //API Call
      await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag })
        })
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit note on clent side.
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;