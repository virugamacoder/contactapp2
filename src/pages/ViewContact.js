import React, { useContext, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { AiFillPushpin } from "react-icons/ai";

import { ContactContext } from "../context/Context";

const ViewContact = () => {
  const { state } = useContext(ContactContext);
  // destructuring contact from the state
  const { contact } = state;

  // and rendering it in state
  //FIXME: destructure contact from state

  useEffect(() => {});

  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col md="5" className="offset-md-3">
          <Card className="pt-3 pb-5">
            <CardBody className="text-center ">
              <img
                height="150"
                width="150"
                className="cardImg profile border-danger"
                src={contact?.picture}
                alt=""
              />

              <CardTitle className="text-primary mt-3">
                <h1>{contact?.name}</h1>
              </CardTitle>
              <CardSubtitle className="mt-3">
                <h3>
                  <FaPhone className="mr-2" /> &nbsp;
                  {contact?.phoneNumber}
                </h3>
              </CardSubtitle>

              <a
                className="btn btn-primary btn-block mt-3"
                target="_blank"
                rel="noreferrer"
                href={`mailto:{contact?.email}`}
              >

                <FaEnvelope className="icon mr-2" />&nbsp;

                {contact?.email}

              </a>
<br/>
              <div
                className="btn btn-primary btn-block mt-3"
              >
                <AiFillPushpin className="icon mr-3" />    &nbsp;
                {contact?.skill}
              </div>

              <div
                className="btn btn-primary btn-block mt-3"
              
                style={{ marginLeft: '25px' }}
              >
                <FaMapMarkerAlt className="icon mr-3" />&nbsp;
                {contact?.address}
              </div>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewContact;
