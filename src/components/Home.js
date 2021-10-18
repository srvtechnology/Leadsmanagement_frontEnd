import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SidePanel from "./SidePanel";
import axios from 'axios';
import Header from './Header';

import { Image, Modal, Button } from "react-bootstrap";
// import TableList from "./TableList";
import baseUrl from './baseurl';

function Home() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const history = useHistory()
        if (!localStorage.getItem('user-info')) {
            history.push("/login")
            window.location.reload(false)
        }
    let token = JSON.parse(sessionStorage.getItem('token'))
    const [show, setShow] = useState(false);
    const [image, setSelectedImage] = useState(null);
    const [id, setId] = useState(user.id)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // window.location.reload(false)
    // useEffect(() => {
    // })
    function setImage(e){
        setSelectedImage(e.target.files[0])
        // console.log(image)
    }

    function saveImage() {
        const formData = new FormData()
        formData.append("image", image);
        formData.append("id", id);
        // console.log(formData)
        fetch(`${baseUrl}/api/save-image`,
            {
                method: 'POST',
                body: formData,
            })
        // axios.post(`${baseUrl}/api/save-image`, id)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                localStorage.setItem("user-info",JSON.stringify(res.user))
                window.location.reload(false)
            })
            .catch(err => {
                console.warn(err.msg)


            });
    }
    // let user_img = `avtar.jpg`
    return (
        <>
            <SidePanel />   
            <Header />
            <section style={{ marginTop: "50px" }}>

                <div className="container">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8 uqwe" >
                                {/* <h1 className="cap" style={{ marginTop: "0px", justifyContent: "center", display: "flex" }}>{user.name}</h1> */}
                                <div className="row">
                                    <label><b>Name:</b> <span>{user.name}</span></label><hr />
                                    <label><b>User Id:</b> <span>{user.user_id}</span></label><hr />
                                    <label><b>Designation:</b> <span>{user.myrole}</span></label><hr />
                                    <label><b>Email:</b> <span>{user.email}</span></label><hr />
                                </div>
                            </div>
                            <div className="col-md-4" style={{ justifyContent: "center", display: "inline-grid" }}>
                                <div className="user-avatar" >
                                    <figure>
                                        {/* <Image className="tygh" src={`asset/image/profile/` + user_img} alt="" /> */}
                                        <Image className="tygh" src={baseUrl + `/uploads/` + user.avatar} alt="Image" />
                                    </figure>
                                </div>
                                <button type="button" className="btn btn-success" onClick={handleShow} >Edit Profile Photo</button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <input type="file" name="image" onChange={(e) => setImage(e) } />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveImage}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default Home;