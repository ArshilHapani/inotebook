import React, { useContext }  from 'react';
import noteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
    let { note,updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    
    return (
        <div>
            <div className="notes-cards">
                <div className="card-body">
                    <h5 className="notes-card-title">{note.title}</h5>
                    <p className="notes-card-description">{note.description}</p>
                    <span className='card-modif-icon' onClick={()=>{deleteNote(note._id); props.showAlert("red","Note Deleted")}}><ion-icon name="trash-outline"></ion-icon></span>
                    <span className='card-modif-icon' onClick={()=>{updateNote(note)}}><ion-icon name="create-outline"></ion-icon></span>
                </div>
            </div>
        </div>
    )
}
