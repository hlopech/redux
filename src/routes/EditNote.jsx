import { Link,  useLoaderData, useNavigate } from "react-router-dom";
import styles from "../../public/styles/EditNote.module.css";
import { useCallback, useState } from "react";
import { z } from "zod";
import { Note } from "../utils/validation";
import API from "../utils/API";
export const loader = async ({ params: { id } }) => {
  const note = await API.getNote(id);
  return { note };
};

export default function EditNote() {
  const { note} = useLoaderData();
  const [newTitle, setNewTitle] = useState(note.title);
  const [newText, setNewText] = useState(note.text);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const handleSetNewTitle = useCallback((e) => {
    setNewTitle(e.target.value);
  }, []);
  const handleSetNewText = useCallback((e) => {
    setNewText(e.target.value);
  }, []);

  const handleSaveNote = async () => {
    try {
      const newNote = Note.parse({
        id: note.id,
        authorId: note.authorId,
        title: newTitle,
        text: newText,
        createdAt: note.createdAt,
      });

      await API.updateNote(note.id, newNote);
      setErrors(null);
      navigate(`/note/${note.id}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-10">
      <div className="w-11/12 md:w-11/12 lg:w-3/5 flex  items-center">
        <Link
          to={`/notes`}
          className="flex text-4xl justify-center items-center text-black px-6 py-3 rounded  bg-gray-400 hover:bg-gray-500"
        >
          <span>Back</span>
        </Link>
        <div className="  ml-80  break-words text-5xl font-semibold text-black">
          Edit Note
        </div>
      </div>
      <div className="flex flex-col justify-center gap-10 w-11/12 md:w-11/12 lg:w-3/5">
        <input
          type="text"
          value={newTitle}
          className={styles.titleContainer}
          onChange={handleSetNewTitle}
        />
        {errors?.title && (
          <div className={styles.error}>{errors?.title?._errors}</div>
        )}
        <textarea
          className={styles.textContainer}
          onChange={handleSetNewText}
          value={newText}
        />
        <button
          className="mt-6 bg-gray-400 text-black text-3xl px-4 p-5 transition duration-300 hover:bg-gray-500 rounded"
          onClick={handleSaveNote}
        >
          Save
        </button>
      </div>
    </div>
  );
}
