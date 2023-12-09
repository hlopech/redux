import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { deleteNotes } from "./redux/notes/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "./redux/user/selectors";
export default function Note({ note }) {
  const authorId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteNote = () => {
    dispatch(deleteNotes(note.id, authorId));
    navigate(`/notes`);
  };
  return (
    <div className="flex flex-row items-center gap-5 my-1 w-full bg-gray-300 rounded p-2 hover:bg-gray-400">
      <Link
        to={`/note/${note.id}`}
        className="flex-1 flex flex-row   items-center gap-2  text-lg"
      >
        <span className="break-all ">{note.title}</span>
        <span className="text-gray-500 ">
          {new Date(note.createdAt).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Link
          to={`/edit-note/${note.id}`}
          className="text-black hover:text-white"
        >
          <EditNoteIcon fontSize="large" />
        </Link>
        <button
          onClick={handleDeleteNote}
          className="text-black hover:text-white"
        >
          <DeleteIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}
