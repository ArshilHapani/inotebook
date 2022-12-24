import React, { useContext,useState } from "react";
import noteContext from "../context/notes/NoteContext";

export default function AddNote() {
    const context = useContext(noteContext);
    const [note, setNote] = useState({title:"",description:"",tag:"default"})
    const { addNote } = context;
    //Adding note by context state.
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    //Updating the current value of the note and creating a new note
    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]:e.target.value, //Change the value equivalent to the value of the name 

        })
    }
    return (
        <div className="form-container">
            <form className="input-form">
                <h2 style={{ paddingBottom: '2vh' }}>Add a Note</h2>
                <label htmlFor="title">Enter Title</label>
                <input type="text" className="title-input" id='title' name="title" onChange={onChange} /><br />
                <label htmlFor="description">Description</label>
                <textarea name="description"  className="title-input desc" id="description" cols="30" rows="10" onChange={onChange}></textarea>    
                <label htmlFor="tag">Tag</label>    
                <input type="text" className="title-input"  id='tag' name="tag" onChange={onChange} />        
                <button className="add-note-btn" onClick={handleClick}><ion-icon name="add-outline"></ion-icon></button>
            </form>
        </div>
    )
}
