import React from 'react'

export default function NoteItem(props) {
    let { note } = props;
    return (
        <div>                    
            <div className="notes-cards">              
                    <div className="card-body">
                        <h5 className="notes-card-title">{note.title}</h5>
                        <p   className="notes-card-description">{note.description}</p>
                        <span className='card-modif-icon'><ion-icon name="trash-outline"></ion-icon></span>
                        <span className='card-modif-icon'><ion-icon name="create-outline"></ion-icon></span>
                    </div>
            </div>
        </div>
    )
}
