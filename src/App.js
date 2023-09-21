import React, { useReducer, useEffect, useState } from "react";

import { Container } from "reactstrap";

// react-router-dom3
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// react toastify stuffs

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// firebase stuffs
//TODO: DONE import firebase config and firebase database
import { firebaseConfig } from "./utils/config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getDatabase, ref, onValue } from "firebase/database";
import "firebase/database";
import "firebase/storage";

// components
import AddContact from "./pages/AddContact";
import Contacts from "./pages/Contacts";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ViewContact from "./pages/ViewContact";
import PageNotFound from "./pages/PageNotFound";
import 'firebase/compat/database';

// context

// context api stuffs
//TODO: DONE import reducers and contexts
import reducer from "./context/reducer";
import { ContactContext } from "./context/Context";
import { SET_CONTACT, SET_LOADING } from "./context/action.types";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";

//initlizeing firebase app with the firebase config which are in ./utils/firebaseConfig
//TODO: initialize FIREBASE

firebase.initializeApp(firebaseConfig);

// first state to provide in react reducer
const initialState = {
  contacts: [],
  contact: {},
  contactToUpdate: null,
  contactToUpdateKey: null,
  isLoading: false,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Requried for User Authotication
  const [user, setUser] = useState(null);

  // will get contacts from firebase and set it on state contacts array
  const getContacts = async () => {
    // TODO: DONE load existing data
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const database = getDatabase();
      const contactsRef = ref(database, "/contacts");

      onValue(contactsRef, (snapshot) => {
        const contactsData = snapshot.val();

        dispatch({
          type: SET_CONTACT,
          payload: contactsData,
        });

        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      // Handle the error as needed
    }
  };

  // getting contact  when component did mount
  useEffect(() => {
    //FIXME: DONE call methods if needed
    getContacts();
  }, []);

  return (
    <Router>
      {/* FIXME: Provider is not configured */}
      <ContactContext.Provider value={{ state, dispatch, user, setUser }}>
        <ToastContainer />
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/contact/add" element={<AddContact />} />{" "}
            {/* Add this line */}
            <Route path="/contact/view" element={<ViewContact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>

        <Footer />
      </ContactContext.Provider>
    </Router>
  );
};

export default App;
