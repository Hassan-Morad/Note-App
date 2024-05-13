import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import style from "./Note.module.css";
import { NoteContext } from "../../Context/NoteContext";
import { showDeleteModal, showUpdatemodal } from "../../utils/Note";

export default function Note({noteobj}) {
  const {setNotes} = useContext(NoteContext)
  const {token} = useContext(UserContext)
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{noteobj.title}</h2>
          <p className={`mb-0 mt-2`}>{noteobj.content}</p>
        </div>

        <div className="note-footer">
          <i onClick={()=>{showUpdatemodal({setNotes,token,noteID:noteobj._id,prevTitle:noteobj.title,prevContent:noteobj.content})}}  className="fa-solid fa-pen-to-square pointer me-2"></i>

          <i onClick={()=>{showDeleteModal({setNotes,token,noteID:noteobj._id})}} className="bi bi-archive-fill pointer"></i>
        </div>
      </div>
    </>
  );
}
