import Button from "@restart/ui/esm/Button";
import { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { AiOutlineBars } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import { BsPeopleCircle, BsGraphUp, BsPencilSquare, BsForwardFill, BsWrench } from "react-icons/bs"
import { NavDropdown } from "react-bootstrap";

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

                            user.role === 1 || user.role === 6 ?
                                <>
                                    <Nav.Item>
                                        <NavDropdown className="cap" title="Manager">
                                            <NavDropdown.Item href="/signUp" >Add Member</NavDropdown.Item>
                                            <NavDropdown.Item href="/team-leader" >Team Leaders</NavDropdown.Item>
                                            <NavDropdown.Item href="/tele-caller" >Tele Callers</NavDropdown.Item>
                                            <NavDropdown.Item href="/bank-person" >Bank Person</NavDropdown.Item>
                                            <NavDropdown.Item href="/bank-person-loan" >Bank Person Loan</NavDropdown.Item>
                                            <NavDropdown.Item href="/manage-leave" >Manage Leave</NavDropdown.Item>
                                        </NavDropdown>

                                    </Nav.Item><hr />

                                </>
                                : user.role === 2 ? <>

                                    <Nav.Item>
                                        <NavDropdown className="cap" title="Manage">
                                            <NavDropdown.Item href="/tele-caller" >Tele Callers</NavDropdown.Item>
                                            <NavDropdown.Item href="/manage-leave" >Manage Leave</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav.Item><hr />
                                </> : user.role === 3 ? <>

                                    <Nav.Item>
                                        <Nav.Link href="/manage-leave" >Manage Leave</Nav.Link>
                                    </Nav.Item><hr />
                                </> : null
                        }

                        {user.bank == "SBI" && user.role == 4 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/SBI.png`} style={{ height: "20px" }} /> SBI</>}>
                                    <NavDropdown.Item href="/sbi-summary"><BsGraphUp /> SBI Summary</NavDropdown.Item>
                                </NavDropdown>

                            </Nav.Item><hr />
                        </> : user.bank == "SCB" && user.role == 4 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/SCB.png`} style={{ height: "20px" }} /> SCB</>}>
                                    <NavDropdown.Item href="/scb-summary"><BsGraphUp /> SCB Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                        </> : user.bank == "CITI" && user.role == 4 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/CITI.png`} style={{ height: "20px" }} /></>}>
                                    <NavDropdown.Item href="/Citi-bank-summary"><BsGraphUp /> Citi Bank Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                        </> : user.bank == "HDFC" && user.role == 4 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/HDFC.png`} style={{ height: "20px" }} /> HDFC</>}>
                                    <NavDropdown.Item href="/hdfc-bank-summary"><BsGraphUp /> HDFC Bank Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                        </> : user.bank == " IIB" && user.role == 4 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/IIB.png`} style={{ height: "20px" }} /> IIB</>}>
                                    <NavDropdown.Item href="/iib-summary"><BsGraphUp /> HDFC Bank Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                        </> : user.bank == "HSBC" && user.role == 4 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/HSBC.png`} style={{ height: "20px" }} /> HSBC</>}>
                                    <NavDropdown.Item href="/hsbc-summary"><BsGraphUp /> HDFC Bank Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                        </> : user.bank == "LOAN" || user.role == 5 ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/loan.png`} style={{ height: "30px" }} /> LOAN</>}>
                                    <NavDropdown.Item href="/loan-summary"><BsGraphUp /> Loan Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                        </> : user.bank == null ? <>
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/SBI.png`} style={{ height: "20px" }} /> SBI</>}>
                                    <NavDropdown.Item href="/sbi-entry"><BsPencilSquare /> SBI Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/sbi-summary"><BsGraphUp /> SBI Summary</NavDropdown.Item>
                                </NavDropdown>

                            </Nav.Item><hr />
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/SCB.png`} style={{ height: "20px" }} /> SCB</>}>
                                    <NavDropdown.Item href="/scb-entry"><BsPencilSquare /> SCB Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/scb-summary"><BsGraphUp /> SCB Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/CITI.png`} style={{ height: "20px" }} /></>}>
                                    <NavDropdown.Item href="/Citi-bank-entry"><BsPencilSquare /> Citi Bank Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/Citi-bank-summary"><BsGraphUp /> Citi Bank Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/HDFC.png`} style={{ height: "20px" }} /> HDFC</>}>
                                    <NavDropdown.Item href="/hdfc-bank-entry"><BsPencilSquare /> HDFC Bank Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/hdfc-bank-summary"><BsGraphUp /> HDFC Bank Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/IIB.png`} style={{ height: "20px" }} /> IIB</>}>
                                    <NavDropdown.Item href="/iib-entry"><BsPencilSquare /> IIB Bank Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/iib-summary"><BsGraphUp /> IIB Bank Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/HSBC.png`} style={{ height: "20px" }} /> HSBC</>}>
                                    <NavDropdown.Item href="/hsbc-entry"><BsPencilSquare /> HSBC Bank Entry</NavDropdown.Item>
                                    <NavDropdown.Item href="/hsbc-summary"><BsGraphUp /> HSBC Bank Summary</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item><hr />
                            <Nav.Item>
                                <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/loan.png`} style={{ height: "30px" }} /> LOAN</>}>
                                    <NavDropdown.Item href="/loan-form"><BsPencilSquare /> Loan Application</NavDropdown.Item>
                                    <NavDropdown.Item href="/loan-summary"><BsGraphUp /> Loan Application Summary</NavDropdown.Item>
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