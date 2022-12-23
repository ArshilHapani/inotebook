import React, { useState } from 'react'

import NoteContext from './NoteContext';
const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "63a44e1f44c5d1b8981c3ad5",
            "user": "63a3003d61887bdf9b882c12",
            "title": "My Note",
            "description": "WAke up to reality",
            "tag": "Madara Uciha",
            "date": "2022-12-22T12:31:27.614Z",
            "__v": 0
        },
        {
            "_id": "63a44e14f44c5d1b8981c3ad5",
            "user": "63a3003d61887bdf9b882c12",
            "title": "My Note",
            "description": "WAke up to reality",
            "tag": "Madara Uciha",
            "date": "2022-12-22T12:31:27.614Z",
            "__v": 0
        },
        {
            "_id": "63a44e1f544c5d1b8981c3ad5",
            "user": "63a3003d61887bdf9b882c12",
            "title": "My Note",
            "description": "WAke up to reality",
            "tag": "Madara Uciha",
            "date": "2022-12-22T12:31:27.614Z",
            "__v": 0
        },

    ]
    const [notes, setNotes] = useState(notesInitial)

    //! Add a note
    console.log("Adding note");
    const addNote = (title,description,tag) => {
        let note =    {
            "_id": "63a44e1f544c5d1b89851c3ad5",
            "user": "63a3003d61887bdf9b882c12",
            "title": title,
            "description":description,
            "tag": tag,
            "date": "2022-12-22T12:31:27.614Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
        console.table(notes)
    }
    //! Delete a note
    const deleteNote = (id) => {

    }
    //! Edit a note
    const editNote = (id) => {

    }
    //Values to update as global state are passed in value property
    //state:state is equivalent to state that's why we pass directly updateState as second parameter which work as updateState:updateState    
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState;