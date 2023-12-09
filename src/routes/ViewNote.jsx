import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import styles from "../../public/styles/ViewNote.module.css";
import API from "../utils/API";
export const loader = async ({ params: { id } }) => {
  const note = await API.getNote(id);
  return { note, id };
};

export default function NotePage() {
  const { note, id } = useLoaderData();
  const navigate = useNavigate();
  const handleDeleteNote = () => {
    API.deleteNote(id);
    navigate(`/notes`);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-10">
      <div className="w-11/12 md:w-11/12 lg:w-3/5 flex justify-between flex-row items-center">
        <Link
          to={`/notes`}
          className="flex text-4xl justify-center items-center text-black px-6 py-3 rounded  bg-gray-400 hover:bg-gray-500"
        >
          <span>Back</span>
        </Link>
        <div className=" lg:max-w-2xl break-words text-2xl font-semibold">
          {note.title}
        </div>
        <div className="flex  flex-row justify-center items-center space-x-4">
          <Link to={`/edit-note/${id}`}>
            <EditNoteIcon />
          </Link>
          <button onClick={handleDeleteNote} className="">
            <DeleteIcon className="text-lg" />
          </button>
        </div>
      </div>
      <span className={styles.textContainer}>{note.text}</span>
    </div>
  );
}
