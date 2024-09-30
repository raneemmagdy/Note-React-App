

import React, { useContext, useState } from "react";
import { noteContext } from "../Context/NoteContext";
import { useFormik } from "formik";


export default function Note({ noteDetails , getAllNotes}) {
  let { deleteNote, updateNote } = useContext(noteContext);
  let [showModal, setShowModal] = useState(false);

  
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  
  async function deleteSpecificNote(id) {
    let data = await deleteNote(id);
    console.log(data);
    await getAllNotes()
  }

 
  async function updateSpecificNote(id, values) {
    let data = await updateNote(id, values);
    console.log(data);
    handleClose();
    await getAllNotes()
  }

  
  let noteUpdate = useFormik({
    initialValues: {
      title: noteDetails.title,
      content: noteDetails.content,
    },
    onSubmit: (values) => {
      updateSpecificNote(noteDetails._id, values);
    },
    enableReinitialize: true, 
  });

  return (
    <>
      <div className="col-md-6">
        <div className="bg-black p-3 text-white rounded-3">
          <div className="d-flex justify-content-between align-items-center border-bottom border-1 border-dark pb-2">
            <h5 className="fw-bold text-capitalize ">{noteDetails.title}</h5>
            <div className="d-flex">
              <i
                style={{ cursor: "pointer" }}
                onClick={() => deleteSpecificNote(noteDetails._id)}
                className="fa fa-trash-can fs-5 me-3"
              ></i>
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-pen-to-square fs-5"
                onClick={handleShow} 
          
              ></i>
            </div>
          </div>
          <p className="mt-3">{noteDetails.content}</p>
        </div>
      </div>

      {/* Modal for updating note */}
      {showModal && (
        <div className="modal show" tabIndex={-1} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Update Note</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose} 
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="form-control py-2 my-2"
                  onBlur={noteUpdate.handleBlur}
                  onChange={noteUpdate.handleChange}
                  value={noteUpdate.values.title}
                />
                <textarea
                  placeholder="Content"
                  name="content"
                  className="form-control py-2 my-2"
                  onBlur={noteUpdate.handleBlur}
                  onChange={noteUpdate.handleChange}
                  value={noteUpdate.values.content}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClose} 
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={noteUpdate.handleSubmit}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
