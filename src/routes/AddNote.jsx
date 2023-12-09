import { Link, useNavigate } from "react-router-dom";
import styles from "../../public/styles/AddNote.module.css";
import { z } from "zod";
import React, { useCallback, useState } from "react";
import { Note } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";
import { addNote } from "../redux/notes/actions";
function AddNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const authorId = useSelector(selectUserId);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSetTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const handleSetText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const handleAddNote = async () => {
    try {
      const note = Note.parse({
        id: crypto.randomUUID(),
        authorId: authorId,
        title,
        text,
        createdAt: Date.now(),
      });

      dispatch(addNote(note));

      setErrors(null);
      navigate(`/notes`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-10">
      <div className="w-11/12 md:w-11/12 lg:w-3/5 flex items-center">
        <Link
          to={`/notes`}
          className="flex text-4xl justify-center items-center text-black px-6 py-3 rounded  bg-gray-400 hover:bg-gray-500"
        >
          <span>Back</span>
        </Link>
        <div className="ml-80 break-words text-5xl font-semibold text-black font-sans">
          Create new note
        </div>
      </div>
      <div className="flex flex-col justify-center gap-10 w-11/12 md:w-11/12 lg:w-3/5">
        <input
          placeholder="Note title"
          type="text"
          value={title}
          className={`${styles.titleContainer} rounded p-2`}
          onChange={handleSetTitle}
        />
        {errors?.title && (
          <div className={styles.error}>{errors?.title?._errors}</div>
        )}
        <textarea
          placeholder="Note text"
          value={text}
          onChange={handleSetText}
          className={`${styles.textContainer} rounded p-2`}
        />
        <button
          className="mt-6 bg-gray-400 text-black text-3xl px-4 p-5 transition duration-300 hover:bg-gray-500 rounded"
          onClick={handleAddNote}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default React.memo(AddNote);
