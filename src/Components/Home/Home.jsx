
import React, { useContext, useEffect, useState } from "react";
import { noteContext } from "../Context/NoteContext";
import { useFormik } from "formik";
import Sidebar from "../Sidebar/Sidebar";
import Note from "../Note/Note";


export default function Home() {
  
  let [notes, setNotes] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let { addNote, getAllNotesForUser } = useContext(noteContext);
 
  const handleClose = () => setShowModal(false);

  // Function to fetch all notes
  async function getAllNotes() {
    try {
      let data = await getAllNotesForUser();
      console.log(data);

      if (data.msg === 'done') {
        setNotes(data);
      }

    } catch (error) {
      console.log(error.response.data.msg);
      if (error.response.data.msg === 'not notes found') {
        return <h1>No notes found</h1>;
      }
    }
  }

  // Function to add a note and then reset the form and close the modal
  async function addNoteAtHome(values, resetForm) {
    try {
      let data = await addNote(values);
      console.log(data);

      if (data.msg === 'done') {
        resetForm();  
        handleClose();  
        await getAllNotes();  
      }

    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  // Formik for handling the note addition form
  let note = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    onSubmit: (values, { resetForm }) => {
      addNoteAtHome(values, resetForm);
    }
  });

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <button
              className="btn btn-info  ms-auto d-block  my-5 fw-bold fs-4"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i className="fa-solid fa-plus"></i> Add Note
            </button>
            <div className="row g-4">
              {notes?.notes?.map((noteDetails) =>
                <Note key={noteDetails._id} noteDetails={noteDetails} getAllNotes={getAllNotes} />
              )}
            </div>

            {/* Modal for adding a new note */}
            <div
              className="modal fade"
              id="staticBackdrop"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Add Note
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleClose}
                    />
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      placeholder="Title"
                      name="title"
                      className="form-control py-2 my-2"
                      onBlur={note.handleBlur}
                      onChange={note.handleChange}
                      value={note.values.title}
                    />
                    <textarea
                      placeholder="Content"
                      name="content"
                      className="form-control py-2 my-2"
                      onBlur={note.handleBlur}
                      onChange={note.handleChange}
                      value={note.values.content}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={note.handleSubmit}
                      data-bs-dismiss="modal"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
