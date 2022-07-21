import AddContact from "./components/pages/addContact";
import ContactList from "./components/pages/contactList";
import Main from "./components/pages/main"
import EditContact from "./components/pages/editContact";
/**
 * Created to simplify the addition of routes in the App.js
 * For every component we want to route to, we add the component route to the routes.js file. 
 */
export const routes = [
    {
        path: "/",
        guarded: false,
        Component: Main
    },
    {
        path: "/contactList",
        guarded: false,
        Component: ContactList
    },
    {
        path: "/addContact",
        guarded: false,
        Component: AddContact
    },
    {
        path: "/editContact",
        guarded: false,
        Component: EditContact
    },
]

export default routes;
