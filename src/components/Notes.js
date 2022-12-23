import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";


export default function Notes() {
    const context = useContext(noteContext);
    const { notes, addNote } = context;
    return (
        <div >
            <AddNote />
            <h2 align='center' style={{ marginBottom: '3vh' }}>Your notes</h2>
            <div className="row">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />;
                })}
            </div>
        </div>
    )
}
