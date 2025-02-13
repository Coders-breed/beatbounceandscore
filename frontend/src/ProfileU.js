import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  ModalFooter,
} from "reactstrap";

import { BsFillDashCircleFill } from "react-icons/bs"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_current, deleteusers, changePassword } from "./redux/Action/authAction";

/* ///////////////////////////////////////////////////////*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateusers } from "./redux/Action/authAction";
import Datetime from "react-datetime";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase";
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,


} from "reactstrap";
import Alerterrors from "./Alerterrors";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Chat from "./User/chat";


const ProfileU = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_current())
  },);

  const user = useSelector((state) => state.Authreducer.user);


  const [pills, setPills] = React.useState("2");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);



  function handleDelete() {
    dispatch(deleteusers(user._id));
  }

  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);


  /*/////////////////////////////////////////////*/

  const navigate = useNavigate();
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email,] = useState(user?.email);
  const [password,] = useState(user?.password);
  const [birthdate, setBirthdate] = useState(user?.birthdate);
  const [gender,] = useState(user?.gender);
  const [image, setImage] = useState(user?.image);
  const [imagee, setImagee] = useState("");


  const [firstnameFocus, setFirstnameFocus] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);
  const [birthdateFocus,] = useState(false);
  const [imageFocus,] = useState(false);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState(user?._id);

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return NotificationManager.error('All fields are required', 'error', 3000);
    } else
      if (newPassword !== confirmPassword) {
        return NotificationManager.error('New password and confirm password do not match', 'error', 3000);
      } else if (newPassword.length < 6) {
        return NotificationManager.error('New password must be at least 6 characters long', 'error', 3000);
      }
    dispatch(changePassword(id, { oldPassword, newPassword, confirmPassword }, navigate));
    console.log(oldPassword, newPassword, confirmPassword)
  };


  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateusers(user._id, { firstname, lastname, email, password, image, birthdate, gender }, navigate));
    console.log(image.name);
  };

  /*const handleGenderChange = (event) => {
    setGender(event.target.value);
  }; */

  const uploadFile = () => {
    if (imagee == null) return;
    const imageRef = ref(storage, `${imagee.name}`);
    uploadBytes(imageRef, imagee).then((snapshot) => {
      getDownloadURL(snapshot.ref);
    });
    window.alert("Uploaded successfully");
    // image.setImage(image.name);
  };

  return (




    <div>

      <div className="wrapper">
        <div
          className="page-header clear-filter page-header-small">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + require("./assets/img/bg5.jpg") + ")"
            }}
          ></div>
          <div className="photo-container">
            <img alt="" src={`https://firebasestorage.googleapis.com/v0/b/beatbounceandscore.appspot.com/o/${user.image}?alt=media&token=894834e1-f47f-4826-b6dc-8801bcae91aa`}></img>
          </div>


        </div>
        <div className="section">
          <Container>
            <div className="button-container">
              <Button className="btn-round" color="warning" size="lg" onClick={() => setModal2(true)}>
                Edit
              </Button>



              <Button
                className="btn-round" size="lg" color="danger"
                onClick={() => setModal1(true)}
              >
                Delete
              </Button>

              <Col md="6">
                <Modal
                  modalClassName="modal-mini modal-danger"
                  toggle={() => setModal1(false)}
                  isOpen={modal1}
                >

                  <ModalBody>

                    <p> <BsFillDashCircleFill color="danger" /> {user.firstname} {user.lastname},
                      Are you sure  to delete your account ?  <BsFillDashCircleFill color="danger" /></p>
                  </ModalBody>
                  <div className="modal-footer">
                    <Button className="btn-neutral" color="link" type="button" onClick={handleDelete}>
                      Confirm
                    </Button>
                    <Button
                      className="btn-neutral"
                      color="link"
                      type="button"
                      onClick={() => setModal1(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Modal>
                <Modal isOpen={modal2} toggle={() => setModal2(false)} >
                  <Alerterrors />

                  <ModalBody>

                    <InputGroup
                      className={
                        "no-border" + (firstnameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name..."
                        type="text"
                        onFocus={() => setFirstnameFocus(true)}
                        onBlur={() => setFirstnameFocus(false)}
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border" + (lastnameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name..."
                        type="text"
                        onFocus={() => setLastnameFocus(true)}
                        onBlur={() => setLastnameFocus(false)}
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                      ></Input>
                    </InputGroup>




                    <InputGroup
                      className={
                        "no-border" + (imageFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">



                      </InputGroupAddon>


                      <Input
                        type="file"
                        onChange={(event) => {
                          setImagee(event.target.files[0]);
                          setImage(event.target.files[0].name);
                        }}
                      />
                      <Button className="btn-round" onClick={uploadFile}>Upload </Button>


                    </InputGroup>

                    <InputGroup
                      className={
                        "no-border" + (birthdateFocus ? " input-group-focus" : "")
                      }
                    >

                        <Datetime
                          placeholder=""
                          type="date"


                          selected={birthdate} onChange={birthdate => setBirthdate(birthdate)}
                          timeFormat={false}
                          inputProps={{ placeholder: "Birthdate Here" }}
                        />
                    </InputGroup>

                    <div className="text-center">
                      <div className="modal-footer">
                        <Button
                          className="btn-round"
                          color="warning"
                          onClick={handleClick}
                          size="lg"
                        >
                          Update
                        </Button>
                        <Button
                          className="btn-round"
                          color="danger"
                          type="button"
                          onClick={() => setModal2(false)}
                          size="lg"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </ModalBody>

                </Modal>
              </Col>

            </div>
            <h3 className="title">About me</h3>
            <div className="description">          
              <h3>Name : {user.firstname} {user.lastname}</h3>
              <h4>Role : {user.role}</h4>
              <h4>Email : {user.email}</h4>
              <h4>Gender : {user.gender}</h4>
              <h4>Birthdate : {user.birthdate.slice(0, -14)}</h4>

              {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}

              <Button color="primary" className="btn-round" onClick={toggleModal}>
                Change Your Password
              </Button>
              <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Change Password</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="oldPassword">Old Password</Label>
                    <Input
                      type="password"
                      name="oldPassword"
                      placeholder="Old Password Here"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="newPassword">New Password</Label>
                    <Input
                      type="password"
                      name="newPassword"
                      placeholder="New Password Here"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="confirmPassword">Confirm New Password</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm New Password Here"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleChangePassword}>
                    Save
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            </div>


            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">My Portfolio</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="now-ui-icons design_image"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="now-ui-icons location_world"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Chat/>
      <NotificationContainer />
    </div>


  );
};

export default ProfileU;