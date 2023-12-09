import RequireAuth from "./components/RequireAuth";
import About from "./routes/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import Notes from "./routes/Notes";
import ViewNote, { loader as noteLoader } from "./routes/ViewNote";
import EditNote, { loader } from "./routes/EditNote";
import AddNote from "./routes/AddNote";
import ErrorPage from "./routes/ErrorPage";
import store, { persistor } from "./redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <SignUp />,
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <Login />,
  },

  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/notes",
        errorElement: <ErrorPage />,
        element: <Notes />,
      },

      {
        errorElement: <ErrorPage />,
        path: "/edit-note/:id",
        loader: loader,
        element: <EditNote />,
      },
      {
        path: "/create-note",
        element: <AddNote />,
      },
      {
        path: "/note/:id",
        loader: noteLoader,
        errorElement: <ErrorPage />,
        element: <ViewNote />,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
