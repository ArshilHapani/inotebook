import NoteContext from './NoteContext';
import { useState } from 'react';
const NoteState = (props) => {
    const s1 = {
        name: "Arshil",
        post: "Developer"
    }
    const [state, setstate] = useState(s1);
    const updateState = ()=>{
        setTimeout(() => {
            setstate({
                name:"Arshil Updated",
                post:"Pro Developer"
            }) 
        }, 1000);
    }
    //Values to update as global state are passed in value property
    //state:state is equivalent to state that's why we pass directly updateState as second parameter which work as updateState:updateState
    return (        
        <NoteContext.Provider value={{state:state,updateState}}>
            {props.children}            
        </NoteContext.Provider>
    )
}

export default NoteState;