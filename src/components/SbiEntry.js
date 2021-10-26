import React, { useState } from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import baseUrl from './baseurl';

function SbiEntry(props) {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [flag, setFlag] = useState(0);
    const [msg, setMsg] = useState('');
    const [checkPan, setcheckPan] = useState('');
    const [checkName, setcheckName] = useState('')
    
    
    function handleCheck() {
        let data = { checkPan, checkName, tc:user.user_id }
        console.log(data)
        fetch(`${baseUrl}/api/lead-check-sbi`,
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
                setMsg(res.msg)
                setcheckName('')
                setcheckPan('')

            })
            .catch(err => {
                console.warn(err.msg)


            });
    }
    
    return (
        <section style={{ marginTop: "80px" }}>
            <div className="container p-3">

                <h1>Check Duplicate Entry</h1><hr/>
                <div className="main-form row">
                    <div className="mb-3 col-md-6 col-12">
                        <label className="form-label">PAN</label>
                        <input type="text" className="form-control" value={checkPan} onChange={(e) => setcheckPan(e.target.value)} />
                    </div>
                    <div className="mb-3 col-md-6 col-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={checkName} onChange={(e) => setcheckName(e.target.value)} />
                    </div>
                </div>
                <div className="col-12">
                    <button type="button" onClick={() => handleCheck()} className="btn btn-primary">Submit</button>
                </div><br />
                <h3 style={{ color: "#f30d0d" }}>{msg}</h3>

               
            </div>
        </section>
    )
}
export default SbiEntry;