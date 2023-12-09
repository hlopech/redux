import styles from "../../public/styles/Notes.module.css";
import Note from "../Note";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUserId } from "../redux/user/selectors";
import { selectNotes, selectNotesError, selectNotesLoading } from "../redux/notes/selectors";
import { getNotes } from "../redux/notes/actions";
export default function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);
  const authorId = useSelector(selectUserId);
  useEffect(() => {
    dispatch(getNotes(authorId))
  }, []);

  if (loading) {
    return<div>Loading...</div>
  }

  if (error) {
    return<div>{error}</div>
  }
  return (
    <div className="flex flex-col items-center  gap-10 justify-center mt-20">
      <span className="text-7xl  mb-6">Notes</span>
      <Link
        to="/create-note"
        className="mt-6 bg-gray-400 text-black text-3xl px-4 p-5 transition duration-300 hover:bg-gray-500 rounded"
      >
        Add new note
      </Link>
      {notes && (
        <div className={styles.notes}>
          {notes
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((n) => (
              <Note key={n.id} note={n} />
            ))}
        </div>
      )}
    </div>
  );
}
