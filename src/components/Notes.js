import React, { useContext, useEffect, useRef, useState } from "react"; //Use ref hooks are used to provide reference to any element
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";


export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" });
    useEffect(() => {
        getNotes();
        //eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    }
    const ref = useRef(null)
    //Adding note by context state.
    const handleClick = (e) => {
        e.preventDefault();
    }
    //Updating the current value of the note and creating a new note
    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value, //Change the value equivalent to the value of the name 

        })
    }


    const toggleModel = async () => {


        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = await function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = await function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = await function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }
    toggleModel();
    return (
        <div >
            <AddNote />
            <button id="myBtn" style={{ display: 'none' }} ref={ref}  >Open Modal</button>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Update a note</h2>
                    </div>
                    <div className="modal-body">
                        <form className="input-form" style={{ width: '100%' }}>
                            <label htmlFor="etitle">Enter Title</label>
                            <input type="text" value={note.etitle} className="title-input" id='etitle' name="etitle" onChange={onChange} /><br />
                            <label htmlFor="edescription">Description</label>
                            <textarea name="edescription" value={note.edescription} className="title-input desc" id="edescription" cols="85" rows="5" onChange={onChange}></textarea>
                            <label htmlFor="etag">Tag</label>
                            <input type="text" className="title-input" id='etag' value={note.etag} name="etag" onChange={onChange} />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleClick}>Save Changes</button>
                    </div>
                </div>

            </div>

            <h2 align='center' style={{ marginBottom: '3vh' }}>Your notes</h2>
            <div style={{display:'flex',justifyContent:"center"}}>
                <div className="row">
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                    })}
                </div>
            </div>
        </div>
    )
}





// <button style={{ display: 'none' }} type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
// Launch demo modal
// </button>

// <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
// <div className="modal-dialog">
//     <div className="modal-content">
//         <div className="modal-header">
//             <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div className="modal-body">
//             <form className="input-form" style={{ width: 'fit-content' }}>
//                 <label htmlFor="etitle">Enter Title</label>
//                 <input type="text" value={note.etitle} className="title-input" id='etitle' name="etitle" onChange={onChange} /><br />
//                 <label htmlFor="edescription">Description</label>
//                 <textarea name="edescription" value={note.edescription} className="title-input desc" id="edescription" cols="55" rows="5" onChange={onChange}></textarea>
//                 <label htmlFor="etag">Tag</label>
//                 <input type="text" className="title-input" id='etag' value={note.etag} name="etag" onChange={onChange} />
//             </form>
//         </div>
//         <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//             <button type="button" className="btn btn-primary" onClick={handleClick}>Update notes</button>
//         </div>
//     </div>
// </div>
// </div>
