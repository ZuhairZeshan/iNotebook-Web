import React, { useState ,useContext} from 'react'
import NoteContext from "../context/notes/NoteContext"


const Addnote = (props) => {
    const context = useContext(NoteContext);
    const { addnote } = context;

    const [note,setnote]=useState({title:"",description:"",tag:""})

    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""});
        props.showalert("Note Added Successfully","Success");
    }
    const onchange = (e) => {
        setnote({...note,[e.target.name] : e.target.value}) //this will keep track on you and store data when writing.
    }

    let looks={
        color:'white',
    }

    return (
        <div>
            <div className='container my-3' style={looks}>
                <h1 >Add a Note</h1>
                <form className='container my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange}/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
