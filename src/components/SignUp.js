import React, { useState } from "react";

import Header from './Header';
import baseUrl from './baseurl';
function SignUp(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState("")
    const [message, setMessage] = useState("")
    const [bank, setBank] = useState("")
    // const history = useHistory()
    const user = JSON.parse(localStorage.getItem('user-info'))
    function register(props) {
        
        let data = { name, password, email, phone, role, bank, bm:user.user_id }

        fetch(`${baseUrl}/api/register`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                console.warn(res.msg)
                if (res.flag === 0) {
                    setMessage(res.msg)
                } else {
                    setMessage(res.msg)
                    setName('')
                    setEmail('')
                    setPassword('')
                    setPhone('')
                    setRole('')
                    // localStorage.setItem("user-info",JSON.stringify(res))
                    // history.push("/home")
                }

            })
            .catch(err => {
                console.warn(err.msg)


            });
    }
    function chooserole(e) {
        setRole(e.target.value)
        console.log(e.target.value)
        // if(e.target.value === 4){
        //     setShow(true) 
        // }else if(e.target.value < 4){
        //     setShow(true) 
        // } 
            

    }
    const Results = () => (
        <div className="form-group ">
            <select id="inputState" className="form-control" value={bank} onChange={(e) => setBank(e.target.value)} >
                <option >Select Bank</option>
                <option value="SBI">SBI</option>
                <option value="SCB">SCB</option>
                <option value="CITI">CITI</option>
               
            </select>
        </div>
    )
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Create New Account</h3>
                    <div className="form-group ">
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="inputName4" placeholder="Name" /><br />

                    </div>
                    <div className="form-group ">

                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="inputEmail4" placeholder="Email" /><br />

                    </div>
                    <div className="form-group ">
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="inputPassword4" placeholder="Password" /><br />
                    </div>
                    <div className="form-group ">
                        <input type="text" maxLength="10" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="inputCiti" placeholder="Phone" /><br />
                    </div>
                    <div className="form-group ">
                        <select id="inputState" className="form-control" value={role} onChange={(e) => chooserole(e)}>
                            <option >Select Role</option>
                            <option value="1">Branch Manager</option>
                            <option value="2">Team Leader</option>
                            <option value="3">Tele Caller</option>
                            <option value="4">Bank Person</option>
                        </select><br />
                    </div>

                    {role == 4 ? <Results /> : null}

                    <br />

                    <div className="subdiv">
                        <button type="button" onClick={() => register()} className="btn btn-primary">Submit</button>
                    </div><br />
                    <h3>{message}</h3>
                </form>
            </div>
        </div>
    );

}

export default SignUp;