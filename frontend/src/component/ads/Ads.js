import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Card,
  Nav,
  Container,
  Image,
  Form,
  Navbar,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// import { Demo } from './Demo';
import axios from "axios";
import { FiDelete } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
export default function Ads({ userInfo }) {
  const [position, setPosition] = useState(0);
  const [yourAdd, setYourAdd] = useState();
  const [image, setImage] = useState();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(position);
  console.log(productName);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      setPosition(position);
    });
  }, []);
  console.log(yourAdd);
  useEffect(() => {
    axios
      .post(`http://localhost:5000/products/your-add/${userInfo.userId}`)
      .then((res) => {
        setYourAdd(res.data.result);
      })
      .catch((err) => {});
  }, []);
  // update
  const updateAdd = (id) => {
    axios
      .patch(`http://localhost:5000/products/${id}`, {
        image,
        productName,
        description,
        price,
        type,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };
  // delete
  const deleteAdd = () => {};
  return (
    <>
      {yourAdd &&
        yourAdd.map((add) => {
          return (
            <>
              <Container className="m-l-5">
                <Card
                  style={{
                    width: "18rem",
                    height: "25rem",
                    marginTop: "2%",
                    marginLeft: "3%",
                  }}
                  class="col"
                >
                  <Card.Img variant="top" src={add.image && add.image} />

                  <Card.Body>
                    <FiDelete />
                    <BiEditAlt onClick={handleShow} />
                    <Card.Title>
                      {add.productName && add.productName}
                    </Card.Title>
                    <Card.Text>{add.description && add.description}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title> Edit Your Product </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          // id="disabledTextInput"
                          placeholder="Product Name"
                          onChange={(e) => {
                            setProductName(e.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">
                          Description
                        </Form.Label>
                        <Form.Control
                          id="disabledTextInput"
                          placeholder="Description"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">
                          Price
                        </Form.Label>
                        <Form.Control
                          id="disabledTextInput"
                          placeholder="Price"
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">
                          Type
                        </Form.Label>
                        <Form.Select
                          id="disabledSelect"
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
                        >
                          <option>Sell</option>
                          <option>Rent</option>
                        </Form.Select>
                      </Form.Group>
                      {/* <Button variant="primary" type="submit">
                        Submit
                      </Button> */}
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        updateAdd(add.id);
                        handleClose();
                      }}
                    >
                      Update
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Container>
            </>
          );
        })}
    </>
  );
}
