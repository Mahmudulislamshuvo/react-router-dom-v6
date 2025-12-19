import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Component Imports
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import Contact from "./Contact";
import EditContact from "./EditContact";
import Index from "./Index";

// Loader Imports
import { getContactLoader, getContactsLoader } from "./loaders/contactsLoader";

// Action Imports
import {
  createContactAction,
  deleteAction,
  editContactAction,
  FevoriteAction,
} from "./actions/contactsAction";

// Router Configuration using JSX Style
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={getContactsLoader}
      action={createContactAction}
      errorElement={<ErrorPage />}
    >
      {/* Pathless Route wrapper for handling child errors inside the Outlet */}
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />

        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={getContactLoader}
          action={FevoriteAction}
        />

        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={getContactLoader}
          action={editContactAction}
        />

        <Route
          path="contacts/:contactId/destroy"
          action={deleteAction}
          errorElement={<p>Opps! There was an error Deleting Contact</p>}
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
