import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { UserWrapper } from "./userWrapper";

const newUser=(props)=> {
    const {visibleModel,handleClose,validNum,submitted,validEmail,userData,setData,submit,type}=props;
    return (
     
        <Modal show={visibleModel} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{type === "edit" ? "Edit User" : "Add User" }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <UserWrapper>
                    <div>
                        <label className="lab"> Title</label>
                        <input style={{ margin: "10px" }} value={userData.name ? userData.name.title : ""} placeholder="Name" onChange={(e) => setData(e.target.value, "name", "title")} />
                    </div>
                    <div>
                        <label className="lab"> First Name</label>
                        <input style={{ margin: "10px" }} value={userData.name ? userData.name.first : ""} placeholder="First Name" onChange={(e) => setData(e.target.value, "name","first")} />
                    </div>
                    <div>
                        <label className="lab"> Last Name</label>
                        <input style={{ margin: "10px" }} value={userData.name ? userData.name.last : ""} placeholder="Last Name" onChange={(e) => setData(e.target.value, "name", "last")} />
                    </div>
                  
                    <div>
                        <label className="lab">Email </label>

                        <input style={{ margin: "10px" }} value={userData.email ? userData.email : ""} placeholder="Email Id" onChange={(e) => setData(e.target.value, "email")} />
                        {validEmail ?<div className="error">Enter valid Email</div>: submitted && !userData.email ? <div className="error">Email Required</div> : ""}

                    </div>
                    <div>
                        <label className="lab">Mobile Num</label>
                        <input style={{ margin: "10px" }} value={userData.phone ? userData.phone : ""} placeholder="Mobile Number" onChange={(e) => setData(e.target.value, "phone")} />
                        {validNum ?<div className="error">Enter valid Number</div>: submitted && !userData.phone ? <div className="error">Number Required</div> : ""}
                    </div>
                    </UserWrapper>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submit}>Submit</Button>{' '}
                <Button onClick={handleClose}>Close</Button>{' '}
            </Modal.Footer>
        </Modal>
  
    )
}

export default newUser;