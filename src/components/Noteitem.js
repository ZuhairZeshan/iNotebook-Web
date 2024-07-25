import React , {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {

    const context = useContext(NoteContext);
    const { deletenote } = context;
    const { note , updatenote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                    <div className="card-body">
                        <div className='d-flex align-items-center'>
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deletenote(note._id);props.showalert("Deleted Successfully","Success");}}></i>
                            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
