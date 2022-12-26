import React, { useContext, useEffect, useRef, useState } from "react"; //!Use ref hooks are used to provide reference to any element
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";


export default function Notes() {    
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line    
    }, [])


    const updateNote = (currentNote) => {
        ref1.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    }
    const ref1 = useRef(null);
    const closeRef = useRef(null);
    //Adding note by context state.
    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeRef.current.click();
    }
    //Updating the current value of the note and creating a new note
    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value, //Change the value equivalent to the value of the name 

        })

    }


    const toggleModel = async () => {
        let modal = await document.getElementById("myModal");
        let btn = await document.getElementById("myBtn");
        let span = await document.getElementsByClassName("close")[0];
        btn.onclick = await function () {
            modal.style.display = "block";
        }
        span.onclick = await function () {
            modal.style.display = "none";
        }
        window.onclick = await function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }
    toggleModel();
    return (
        <div >
            <AddNote key={notes.id} />
            <button id="myBtn" style={{ display: 'none' }} ref={ref1}  >Open Modal</button>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" ref={closeRef}>&times;</span>
                        <h2>Update a note</h2>
                    </div>
                    <div className="modal-body">
                        <form className="input-form" style={{ width: '100%' }}>
                            <label htmlFor="etitle">Enter Title</label>
                            <input type="text" value={note.etitle} placeholder="Minimum length 3 needed" className="title-input" id='etitle' name="etitle" onChange={onChange} /><br />
                            <label htmlFor="edescription">Description</label>
                            <textarea name="edescription" placeholder="Minimum length 5 needed" value={note.edescription} className="title-input desc" id="edescription" cols="85" rows="5" onChange={onChange}></textarea>
                            <label htmlFor="etag">Tag</label>
                            <input type="text" className="title-input" id='etag' value={note.etag} name="etag" onChange={onChange} />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleClick} disabled={note.etitle.length < 3 || note.edescription.length < 5} className='classic-button' >Save Changes</button>
                    </div>
                </div>

            </div>

            <h2 align='center' style={{ marginBottom: '3vh' }}>Your notes</h2>
            <div style={{ display: 'flex', justifyContent: "center" }}>
                <div className="row">
                    <h3 style={{ marginBottom: '5vh' }}>{notes.length === 0 && "No notes available..."}</h3>
                    {notes.map((note) => {                      
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                    })}
                </div>
            </div>
        </div>
    )
}
//TODO : Notes is'nt updating in the client side