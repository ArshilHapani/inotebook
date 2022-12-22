import React, { useContext,useEffect } from "react";
import noteContext from "../context/notes/NoteContext";

export default function Home() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.updateState();
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <h1>Inotebook app <br />Hello {a.state.name} you are greate {a.state.post}</h1>
    </>
  )
}
