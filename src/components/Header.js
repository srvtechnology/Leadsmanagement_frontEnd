import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { BsPeopleCircle, BsGraphUp, BsPencilSquare, BsForwardFill, BsWrench } from "react-icons/bs"
import SidePanel from "./SidePanel";
import baseUrl from './baseurl';
// import Login from "./Login";
// import SignUp from "./SignUp";

function Header(Props) {
    // localStorage.clear()
    // sessionStorage.clear()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const history = useHistory()
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
        window.location.reload(false)
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                {localStorage.getItem('user-info') ? <SidePanel /> : <> </>}
                {/* <Link className="navbar-brand cap" to="/home"  style={{ fontWeight: "800", marginLeft:"10px" }}><h2>Lead Management</h2></Link> */}
                <Navbar.Brand href="/home" style={{ fontWeight: "800", marginLeft: "10px" }}><h2>Lead Management</h2></Navbar.Brand>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02" style={{ justifyContent: "flex-end" }}>
                    <ul className="navbar-nav ml-auto">
                        {
                            localStorage.getItem('user-info') ?
                                <>
                                    {user.bank == "SBI" && user.role == 4 ? <>
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/SBI.png`} style={{ height: "20px" }} alt="SBI" /> SBI</>}>
                                            <NavDropdown.Item href="/sbi-summary"><BsGraphUp /> SBI Summary</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/SBI"><BsGraphUp /> SBI Loan Summary</NavDropdown.Item>
                                        </NavDropdown>
                                    </> : user.bank == "SCB" && user.role == 4 ? <>
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/SCB.png`} style={{ height: "20px" }} alt="SCB" /> SCB</>}>
                                            <NavDropdown.Item href="/scb-summary"><BsGraphUp /> SCB Summary</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/SCB"><BsGraphUp /> SCB Loan Summary</NavDropdown.Item>
                                        </NavDropdown>
                                    </> : user.bank == "CITI" && user.role == 4 ? <>
                                            <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/CITI.png`} style={{ height: "20px" }} /></>}>
                                                <NavDropdown.Item href="/Citi-bank-summary"><BsGraphUp /> Citi Bank Summary</NavDropdown.Item>
                                                <NavDropdown.Item href="/loan-summary/CITI"><BsGraphUp /> CITI Loan Summary</NavDropdown.Item>
                                            </NavDropdown>
                                    </> : user.bank == "HDFC" && user.role == 4 ? <>
                                    <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/HDFC.png`} style={{ height: "20px" }} /> HDFC</>}>
                                        <NavDropdown.Item href="/hdfc-bank-summary"><BsGraphUp /> HDFC Bank Summary</NavDropdown.Item>
                                        <NavDropdown.Item href="/loan-summary/HDFC"><BsGraphUp /> HDFC Loan Summary</NavDropdown.Item>
                                    </NavDropdown>
                                    </> : user.bank == "IIB" && user.role == 4 ? <>
                                    <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/IIB.png`} style={{ height: "20px" }} /> IIB</>}>
                                        <NavDropdown.Item href="/iib-summary"><BsGraphUp /> IIB Bank Summary</NavDropdown.Item>
                                        <NavDropdown.Item href="/loan-summary/IIB"><BsGraphUp /> IIB Loan Summary</NavDropdown.Item>
                                    </NavDropdown>
                                    {/* </> : user.bank == "HSBC" && user.role == 4 ? <>
                                    <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/HSBC.png`} style={{ height: "20px" }} /> HSBC</>}>
                                        <NavDropdown.Item href="/hsbc-summary"><BsGraphUp /> HSBC Bank Summary</NavDropdown.Item>
                                        <NavDropdown.Item href="/loan-summary/HSBC"><BsGraphUp /> HSBC Loan Summary</NavDropdown.Item>
                                    </NavDropdown> */}
                                    </> : user.bank == "IDFC" && user.role == 4 ? <>
                                    <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/IDFC.png`} style={{ height: "20px" }} /> </>}>
                                        <NavDropdown.Item href="/idfc-summary"><BsGraphUp /> IDFC Bank Summary</NavDropdown.Item>
                                        <NavDropdown.Item href="/loan-summary/IDFC"><BsGraphUp /> IDFC Loan Summary</NavDropdown.Item>
                                    </NavDropdown>
                                    </> : user.bank == "LOAN" || user.role == 5 ? <>
                                    <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/loan.png`} style={{ height: "30px" }} /> LOAN</>}>
                                        {/* <NavDropdown.Item href="/hsbc-bank-summary"><BsGraphUp /> HSBC Bank Summary</NavDropdown.Item> */}
                                        <NavDropdown.Item href="/loan-summary"><BsGraphUp /> Loan Summary</NavDropdown.Item>
                                    </NavDropdown>
                                    </> : user.bank == null ? <>
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/SBI.png`} style={{ height: "20px" }} alt="SBI" /> SBI</>}>
                                            <NavDropdown.Item href="/sbi-entry"><BsPencilSquare /> SBI Entry</NavDropdown.Item>
                                            <NavDropdown.Item href="/sbi-summary"><BsGraphUp /> SBI Summary</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-form/SBI"><BsPencilSquare /> SBI Loan</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/SBI"><BsGraphUp /> SBI Loan Summary</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/SCB.png`} style={{ height: "20px" }} alt="SCB" /> SCB</>}>
                                            <NavDropdown.Item href="/scb-entry"><BsPencilSquare /> SCB Entry</NavDropdown.Item>
                                            <NavDropdown.Item href="/scb-summary"><BsGraphUp /> SCB Summary</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-form/SCB"><BsPencilSquare /> SCB Loan</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/SCB"><BsGraphUp /> SCB Loan Summary</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/CITI.png`} style={{ height: "20px" }} /></>}>
                                                <NavDropdown.Item href="/Citi-bank-entry"><BsPencilSquare /> Citi Bank Entry</NavDropdown.Item>
                                                <NavDropdown.Item href="/Citi-bank-summary"><BsGraphUp /> Citi Bank Summary</NavDropdown.Item>
                                                <NavDropdown.Item href="/loan-form/CITI"><BsPencilSquare /> CITI Loan</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/CITI"><BsGraphUp /> CITI Loan Summary</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/HDFC.png`} style={{ height: "20px" }} /> HDFC</>}>
                                                <NavDropdown.Item href="/hdfc-bank-entry"><BsPencilSquare /> HDFC Bank Entry</NavDropdown.Item>
                                                <NavDropdown.Item href="/hdfc-bank-summary"><BsGraphUp /> HDFC Bank Summary</NavDropdown.Item>
                                                <NavDropdown.Item href="/loan-form/HDFC"><BsPencilSquare /> HDFC Loan</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/HDFC"><BsGraphUp /> HDFC Loan Summary</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/IIB.png`} style={{ height: "20px" }} /> IIB</>}>
                                                <NavDropdown.Item href="/iib-entry"><BsPencilSquare /> IIB Bank Entry</NavDropdown.Item>
                                                <NavDropdown.Item href="/iib-summary"><BsGraphUp /> IIB Bank Summary</NavDropdown.Item>
                                                <NavDropdown.Item href="/loan-form/IIB"><BsPencilSquare /> IIB Loan</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/IIB"><BsGraphUp /> IIB Loan Summary</NavDropdown.Item>
                                        </NavDropdown>
                                        {/* <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/HSBC.png`} style={{ height: "20px" }} /> HSBC</>}>
                                                <NavDropdown.Item href="/hsbc-entry"><BsPencilSquare /> HSBC Bank Entry</NavDropdown.Item>
                                                <NavDropdown.Item href="/hsbc-summary"><BsGraphUp /> HSBC Bank Summary</NavDropdown.Item>
                                                <NavDropdown.Item href="/loan-form/HSBC"><BsPencilSquare /> HSBC Loan</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/HSBC"><BsGraphUp /> HSBC Loan Summary</NavDropdown.Item>
                                        </NavDropdown> */}
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/IDFC.png`} style={{ height: "20px" }} alt="IDFC" /> </>}>
                                                <NavDropdown.Item href="/idfc-entry"><BsPencilSquare /> IDFC Bank Entry</NavDropdown.Item>
                                                <NavDropdown.Item href="/idfc-summary"><BsGraphUp /> IDFC Bank Summary</NavDropdown.Item>
                                                <NavDropdown.Item href="/loan-form/IDFC"><BsPencilSquare /> IDFC Loan</NavDropdown.Item>
                                            <NavDropdown.Item href="/loan-summary/IDFC"><BsGraphUp /> IDFC Loan Summary</NavDropdown.Item>
                                        </NavDropdown>
                                        
                                        <NavDropdown className="cap" title={<><img src={baseUrl + `/asset/loan.png`} style={{ height: "30px" }} /> LOAN</>}>
                                                <NavDropdown.Item href="/loan-form"><BsPencilSquare /> Loan Application</NavDropdown.Item>
                                                <NavDropdown.Item href="/loan-summary"><BsGraphUp /> Loan Application Summary</NavDropdown.Item>
                                        </NavDropdown>
                                    </> : <></>

                                    }

                                    <NavDropdown className="cap" title={<> <BsPeopleCircle /> {user.name}</>}>
                                        <NavDropdown.Item href="/edit-profile"><BsWrench /> Edit Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={logout}><BsForwardFill /> Logout</NavDropdown.Item>
                                    </NavDropdown>

                                </>
                                :
                                <>
                                    <Nav className="me-auto">
                                        <Nav.Link href="/login">Login</Nav.Link>
                                        <Nav.Link href="/about-us">About Us</Nav.Link>
                                        <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                                    </Nav>

                                </>
                        }

                    </ul>
                </div>
            </div>


            {/* <div className="auth-wrapper">
                <div className="auth-inner">
                  <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path="/sign-in" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                  </Switch>
                </div>
              </div> */}
        </nav>
    )
}

export default Header