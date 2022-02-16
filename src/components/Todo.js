import { useState } from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

function Todo(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    if (modalIsOpen === true) {
      return;
    }

    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function confirmHandler() {
    setModalIsOpen(false);
    props.onDelete(props.id);
  }

  return (
    <div className="card">
      <h2>{props.text}</h2>
      <div className="actions">
        {props.loading !== 'true' && (
          <button className="btn" onClick={deleteHandler}>
            Delete
          </button>
        )}
        {modalIsOpen && (
          <Modal onConfirm={confirmHandler} onCancel={closeModalHandler} />
        )}
        {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
      </div>
    </div>
  );
}

export default Todo;
