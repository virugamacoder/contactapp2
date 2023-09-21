import React, { useContext, useState } from "react";

import { Container, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import Contact from "../components/Contact";
import { MdAdd, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../context/Context";
import { CONTACT_TO_UPDATE } from "../context/action.types";

const Contacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  const context = useContext(ContactContext);
  // destructuring contacts and isLoading from state
  const { contacts, isLoading } = state;

  const [contact, setContact] = useState({});
  const [contactKey, setContactKey] = useState("");
  const [isAdd, setIsAdd] = useState(true);

  // history hooks from react router dom to get history
  const history = useNavigate();

  // handle fab icon button click
  // will set in state of the contact to update and send it to the contact/add route
  const AddContact = () => {
    //TODO: DONE use dispatch to send user to add contact screen
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: null,
      key: null,
    });

    history("/contact/add");
  };

  const updateContact = () => {
    // dispatching one action to update contact
    //TODO: DONE use dispatch to update
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: contact,
      key: contactKey,
    });

    // and pushing to the add contact screen

    history("/contact/add");
  };

  const handleContactDeletion = () => {
    setIsAdd(true);
  };

  // return loading spinner
  if (isLoading) {
    return (
      <div className="Center">
        <Spinner color="primary" />
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      {/* TODO: DONE Loop through FIREBASE objects  */}
      {contacts.length === 0 && !isLoading ? (
        <div className="Center text-large text-primary">
          No Contact Found In Database{" "}
        </div>
      ) : (
        <ListGroup>
          {Object.entries(contacts).map(([key, value]) => (
            <ListGroupItem key={key}>
              <Contact
                contact={value}
                contactKey={key}
                onDeleteContact={handleContactDeletion}
              />

              {/* {isAdd?((value.permission===context.user?.uid)?
                     (
                      setIsAdd(false)
                     ):("")):("") } */}

              {isAdd && value.permission === context.user?.uid && (
                <>
                  {setIsAdd(false)}
                  {setContact(value)}
                  {setContactKey(key)}
                </>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}

      {isAdd ? (
        <MdAdd className="fab icon mb-5" onClick={AddContact} />
      ) : (
        <MdEdit className="fab icon mb-5 p-2" onClick={updateContact} />
      )}
    </Container>
  );
};

export default Contacts;
