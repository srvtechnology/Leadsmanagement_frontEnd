import { useHistory } from "react-router-dom"
import Header from "./Header"
import SidePanel from "./SidePanel"
import { useEffect, useState } from "react"

import baseUrl from './baseurl';

function ResetPass(){
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [oldPass, setOldpass] = useState('')
    const [newPass,setNewpass]=useState('')
    const [confirmNewPass,setConfirmNewpass]=useState('')
    const [message, setMessage]= useState('')
function send(){
    let data= {'old_password':oldPass,'new_password':newPass,'confirm_password':confirmNewPass, 'id':user.id}
    fetch(`${baseUrl}/api/change-password`,
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
        console.warn(res)
        setMessage(res.message)

    })
    .catch(err => {
        console.warn(err.msg)


    });
}
    return (
        <>
        <Header />
       
        <section style={{ marginTop: "120px" }}>

            <div className="auth-wrapper">
                <Header />
                <div className="auth-inner">
                    <form>
                        <h3>Reset Password</h3>

                       
                        <div className="form-group ">
                            <input type="password" className="form-control" value={oldPass} onChange={(e) => setOldpass(e.target.value)} id="inputEmail4" placeholder="Old Password" /><br />
                        </div>
                        <br />
                        <div className="form-group ">
                            <input type="password" className="form-control" value={newPass} onChange={(e) => setNewpass(e.target.value)} id="inputEmail4" placeholder="New Password" /><br />
                        </div>
                        <br />
                        <div className="form-group ">
                            <input type="password" className="form-control" value={confirmNewPass} onChange={(e) => setConfirmNewpass(e.target.value)} id="inputEmail4" placeholder="Confirm New Password" /><br />
                        </div>
                        <br />

                        <div className="subdiv">
                            <button type="button" onClick={() => send()} className="btn btn-primary">Submit</button>
                        </div><br />
                    </form>
                <h3 style={{color: "blueviolet"}}>{message}</h3>
                </div>
            </div>
        </section>
    </>
    )
}

export default ResetPass