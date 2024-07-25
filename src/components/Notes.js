import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    const context = useContext(NoteContext);
    let navigate = useNavigate();
    const { notes, getnotes, editnote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes();
        } else {
            navigate("/login");
        }
    }, []);

    const ref = useRef(null);
    const refclose = useRef(null);
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updatenote = (currentnote) => {
        ref.current.click();    //it will show if hide otherwise hide if show.
        setnote({
            id: currentnote._id,
            etitle: currentnote.title,
            edescription: currentnote.description,
            etag: currentnote.tag
        });
    }

    const handleclick = (e) => {
        e.preventDefault();
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        props.showalert("Updated Successfully", "Success");
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value }) //this will keep track on you and store data when writing.
    }

    let looks={
        color:'white',
    }

    return (
        <>
            <Addnote showalert={props.showalert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3' style={looks}>
                <h1>Your Notes</h1>
                <div className='container mx-3'>
                    {notes.length === 0 && "No Notes to Display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem showalert={props.showalert} key={note._id} updatenote={updatenote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
