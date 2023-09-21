// https://firebase.google.com/docs/database/web/read-and-write?authuser=1#read_data_once

import React, { useContext } from "react";
import { Row, Col } from "reactstrap";

// icons
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiFillPushpin } from "react-icons/ai";

import { CgProfile } from "react-icons/cg";


//TODO: Done add firebase
import firebase from "firebase/compat/app";

// context stuffs
//TODO: DONE import context and action: update and single_contact
import { ContactContext } from "../context/Context";
import { CONTACT_TO_UPDATE, SET_SINGLE_CONTACT } from "../context/action.types";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Contact = ({ contact, contactKey, onDeleteContact }) => {
  //TODO: DONE destructuring dispatch from the context

  const { dispatch } = useContext(ContactContext);
  const context = useContext(ContactContext);

  // history hooks to get history
  const history = useNavigate();

  // to delete the contact when delete contact is clicked
  const deleteContact = () => {
    //TODO: DONE create this method from firebase

    if (!context.user?.uid) {
      history("/signin");
    } else {
      firebase
        .database()
        .ref(`/contacts/${contactKey}`)
        .remove()
        .then(() => {
          toast("Deleted Successfully...", { type: "success" });
          // Notify the parent component that a contact has been deleted
          onDeleteContact();
        })
        .catch((error) => {
          console.error(error);
          toast(error, { type: "error" });
        });
    }
  };

  // update the star/important contact ,ie, star it or unstar the single contact
  const updateImpContact = () => {
    //TODO: DONE update (star) contact, use contactKey
    if (!context.user?.uid) {
      history("/signin");
    } else {
      firebase
        .database()
        .ref(`/contacts/${contactKey}`)
        .update(
          {
            star: !contact.star,
          },
          (err) => {
            console.log(err);
          }
        )
        .then("Contact Updated (Star)", { type: "success" })
        .catch((error) => {
          console.error(error);
          toast(`Not Update Contact ${error}`, { type: "error" });
        });
    }
  };

  // when the update icon/ pen ion is clicked
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

  // to view a single contact in the contact/view screen
  const viewSingleContact = (contact) => {
    // setting single contact in state
    //TODO: DONE use dispatch to view single contact
    dispatch({
      type: SET_SINGLE_CONTACT,
      payload: contact,
    });
    // sending...
    history("/contact/view");
  };

  return (
    <>
      <Row className="table-hover">
        <Col
          md="1"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="icon" onClick={() => updateImpContact()}>
            {contact.star ? (
              <FaStar className=" text-primary" />
            ) : (
              <FaRegStar className=" text-info" />
            )}
          </div>
        </Col>
        <Col
          md="2"
          className="d-flex justify-content-center align-items-center"
        >
          <img src={contact.picture} alt="" className="img-circle profile" />
        </Col>

        <Col md="8" onClick={() => viewSingleContact(contact)}>
          <div className="text-primary text-decoration-underline"><h5><CgProfile/>&nbsp;{contact.name}</h5>  </div>

          <div className="text-secondary"> <FaPhone/> &nbsp; {contact.phoneNumber}</div>
          <div className="text-secondary"><FaEnvelope/> &nbsp; {contact.email}</div>
          <div className="text-info"> <AiFillPushpin/> &nbsp;{contact.skill}</div>
          <div className="text-info"> <FaMapMarkedAlt/> &nbsp;{contact.address}</div>
        </Col>
        <Col
          md="1"
          className="d-flex justify-content-center align-items-center"
        >
          {contact.permission === context.user?.uid ? (
            <MdDelete
              onClick={() => deleteContact()}
              color="danger"
              className="text-danger icon"
            />
          ) : (
            ""
          )}

          {contact.permission === context.user?.uid ? (
            <MdEdit
              className="icon text-info ml-2"
              onClick={() => updateContact()}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
};

export default Contact;
