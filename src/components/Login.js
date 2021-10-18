import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from './Header';
import baseUrl from './baseurl';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const history = useHistory()
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/home")
        }
    })
    
    function signin() {
        let data = { password, email }
        fetch(`${baseUrl}/api/login`,
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
                console.log(res)
                if (res.token) {
                    localStorage.setItem("user-info", JSON.stringify(res.user))
                    sessionStorage.setItem("token", JSON.stringify(res.token))
                    
                    var min = 60; // Reset when storage is more than 24hours
                    var now = new Date().getTime();
                    var interval = now + (min*60*1000)
                    localStorage.setItem("interval", JSON.stringify(interval))
                    history.push("/home")
                } else {
                    setMessage("Wrong Credentials!")
                }


            })
            .catch(err => {
                console.warn(err.message)
                setMessage("Something Went Wrong!")
            });
    }
    return (
        <div className="auth-wrapper">
            <Header />
            <div className="auth-inner">
                <form>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" required/><br />
                    </div>

                    <div className="form-group">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" required/><br />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <br />
                    <div className="subdiv">
                        <button type="button" onClick={() => signin()} className="btn btn-primary btn-block">Sign In</button>
                    </div>
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="/forgot-password">password?</a>
                    </p> */}
                    <h3>{message}</h3>
                </form>
            </div>
        </div>
    );

}

export default Login;