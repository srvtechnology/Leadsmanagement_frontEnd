import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowRight, FaEye, FaKey } from "react-icons/fa";
import { useLocation, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Compressor from 'compressorjs';

import baseUrl from './baseurl';

function LeaveApplication(props) {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [msg, setMsg] = useState('');
    const [flag, setflag]=useState(null)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [Subject, setSubject] = useState(''); const [Discp, setDiscp] = useState('');
    const [status, setstatus] = useState('');
    const [user_id, setuser_id] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Name, setName] = useState('');
    const [Remark, setRemark] = useState('');
    const leave_id = props.match.params.id
    const history = useHistory()
    if (!localStorage.getItem('user-info')) {
        history.push("/login")
    }
    useEffect(async () => {

        let res = await fetch(`${baseUrl}/api/leave-info/${leave_id}`);
        res = await res.json();
        setName(res.name)
        setEmail(res.email)
        setPhone(res.phone)
        setStartDate(res.from_date)
        setEndDate(res.to_date)
        setSubject(res.subject)
        setDiscp(res.reason)
        setstatus(res.status)
        setRemark(res.remark)
    }, [])
    function handleBack(e) {
        history.push("/manage-leave")
    }

    function handleSubmit() {
        let data = {leave_id, flag,Remark}

        fetch(`${baseUrl}/api/bm-update-leave`,
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
                    setMsg(res.msg);
            })
            .catch(err => {
                console.warn(err.msg)
            });
    }
    return (
        <>
            <section style={{ marginTop: "80px", justifyContent: "center" }}>
                <div className="container p-3">

                    <h1>Leave Application</h1>
                    <hr />
                    <div className="main-form row" style={{ justifyContent: "center" }}>
                        {/* <div className="mb-3 col-md-6 col-12"> */}
                        <div className="col-md-12 row">
                            <div className="col-md-2"><strong >Name:</strong></div>
                            <div className="col-md-8"><span>{Name}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-2"><strong >Email:</strong></div>
                            <div className="col-md-8"><span>{Email}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-2"><strong >Phone No:</strong></div>
                            <div className="col-md-8"><span>{Phone}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-2"><strong>Leave Date:</strong></div>
                            <div className="col-md-8"><span>{startDate} <strong > To </strong>{endDate}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-2"><strong >Subject:</strong></div>
                            <div className="col-md-8"><span>{Subject}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-2"><strong >Description:</strong></div>
                            <div className="col-md-8"><p><span>{Discp}</span></p></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-2"><strong >Status:</strong></div>
                            <div className="col-md-8"><span>{status}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-2"><strong >Remark:</strong></div>
                            <div className="col-md-8"><span>{Remark}</span></div>
                        </div>
                        {user.role === 1 || user.role === 6 ? <>
                            <hr/><div className="mb-3 col-md-6 ">
                                {/* <label className="form-label">Change Status</label> */}
                                <select className="form-select" value={flag} onChange={(e) => setflag(e.target.value)}>
                                    <option value="33">Change Application Status</option>
                                    <option value="5">Decline</option>
                                    <option value="6">Approve</option>

                                </select>
                            </div>
                            {flag == 5 || flag == 6  ? <>
                                <hr /><div className="mb-3 col-md-6">
                                                    <label className="form-label">Remark</label>
                                                    <textarea className="form-control" value={Remark} onChange={(e) => setRemark(e.target.value)} />
                                                </div>
                                            </> : null}
                        </> : null}


                        <hr />
                        <div className="col-md-12 row" style={{ marginTop: "15px", justifyContent: "center" }}>

                        {user.role === 1 || user.role === 6 ? <>
                            <div className="col-md-3">
                                <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">Submit <FaArrowRight /></button>
                            </div>
                        </>:null
                        }
                            <button type="button" onClick={() => handleBack()}
                                style={{ width: "auto" }}
                                className="btn btn-secondary">Go Back <FaTimes /></button>
                        </div>
                        <div className="col-md-12 center row" style={{textAlign: "center", marginTop: "10px"}}>
                        
                                <h3 style={{ color: "blue" }}>{msg}</h3>
                           
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}
export default LeaveApplication;