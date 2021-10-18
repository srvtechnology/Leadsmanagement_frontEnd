import Button from "@restart/ui/esm/Button";
import { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { AiOutlineBars } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import { BsPeopleCircle, BsGraphUp, BsPencilSquare, BsForwardFill, BsWrench } from "react-icons/bs"
import { NavDropdown } from "react-bootstrap";
import SBI from "./SBI.png"
import SCB from "./SCB.png"

import baseUrl from './baseurl';
function SidePanel() {
    const [show, setShow] = useState(false);
    const history = useHistory()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function logout() {
        fetch(`${baseUrl}/api/logout`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })

            .then(res => res.json())
            .then(res => {
                console.warn(res)
            })
            .catch(err => {
                console.warn(err)
                // setMessage("Something Went Wrong!")
            });
        localStorage.clear()
        sessionStorage.clear()
        history.push("/login")
    }
    return (
        <div>
            <Button className="btn btn-primary" variant="primary" onClick={handleShow}>
                <AiOutlineBars />
            </Button>

            <Offcanvas show={show} onHide={handleClose} style={{ backgroundColor: "aliceblue", width: "auto" }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ fontSize: "xx-large", fontWeight: "bold" }}>Lead Management</Offcanvas.Title>
                </Offcanvas.Header><hr />
                <Offcanvas.Body>
                    <Nav activeKey="/home" style={{ display: "block", fontSize: "large", textAlign: "center" }}>
                        <Nav.Item>
                            <NavDropdown className="cap" title={<> <BsPeopleCircle /> {user.name}</>}>
                                <NavDropdown.Item href="/edit-profile"><BsWrench /> Edit Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/reset-password"><BsWrench /> Reset Password</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item><hr />
                        {

                            user.role === 1 ?
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/signUp" >Add Member</Nav.Link><hr />
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link href="/team-leader" >Team Leaders</Nav.Link><hr />
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/tele-caller" >Tele Callers</Nav.Link><hr />
                            </Nav.Item>
                            </>
                                : user.role === 2 ? <>
                                <Nav.Item>
                                <Nav.Link href="/tele-caller" >Tele Callers</Nav.Link><hr />
                                </Nav.Item>
                                </>:
                                <></>
                        }

                        {user.bank == "SBI" && user.role == 4 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={SBI} style={{ height: "20px" }} /> SBI</>}>
                                    <NavDropdown.Item href="/sbi-entry"><BsPencilSquare /> SBI Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/sbi-summary"><BsGraphUp /> SBI Summary</NavDropdown.Item>
                                </NavDropdown>

                            </Nav.Item><hr />
                        </> : user.bank == "SCB" && user.role == 4 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={SCB} style={{ height: "20px" }} /> SCB</>}>
                                    <NavDropdown.Item href="/scb-entry"><BsPencilSquare /> SCB Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/scb-summary"><BsGraphUp /> SCB Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                        </> : user.bank == null ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={SBI} style={{ height: "20px" }} /> SBI</>}>
                                    <NavDropdown.Item href="/sbi-entry"><BsPencilSquare /> SBI Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/sbi-summary"><BsGraphUp /> SBI Summary</NavDropdown.Item>
                                </NavDropdown>

                            </Nav.Item><hr />
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={SCB} style={{ height: "20px" }} /> SCB</>}>
                                    <NavDropdown.Item href="/scb-entry"><BsPencilSquare /> SCB Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/scb-summary"><BsGraphUp /> SCB Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                        </> : <></>
                        }

                        <Nav.Item>
                            <Nav.Link onClick={logout}>Logout</Nav.Link><hr />
                        </Nav.Item>

                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default SidePanel;