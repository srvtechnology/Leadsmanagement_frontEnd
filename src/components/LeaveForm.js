import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowRight, FaEye, FaKey } from "react-icons/fa";
import { useLocation, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Compressor from 'compressorjs';

import baseUrl from './baseurl';

function LeaveForm(props) {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [flag, setFlag] = useState(0);
    const [msg, setMsg] = useState('');
    const date = new Date();
    const day = date.getDate(); const day1 = date.getDate() - (day - 1); const month = date.getMonth() + 1; const year = date.getFullYear();
    const yesterday = year + '-' + month + '-0' + day1
    console.log(yesterday);
    const today = day < 10 ? year + '-' + month + '-0' + day : year + '-' + month + '-' + day
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [Subject, setSubject] = useState(''); const [Discp, setDiscp] = useState('');
    const lead_id = props.match.params.id
    const history = useHistory()
    if (!localStorage.getItem('user-info')) {
        history.push("/login")
    }
    useEffect(async () => {
        if (lead_id > 0) {
            let res = await fetch(`${baseUrl}/api/get-lead-citi/${lead_id}`);
            res = await res.json();


        }
    }, [])
    function handleBack(e) {
        history.push("/manage-leave")
    }




    function handleSubmit() {
        let data = {
            user_id: user.user_id, role: user.role, startDate, endDate, Subject, Discp
        }

        fetch(`${baseUrl}/api/apply-leave`,
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
                if(res.flag === 1){
                    setSubject('');setDiscp('');setStartDate(today);setEndDate(today);
                }

            })
            .catch(err => {
                console.warn(err.msg)
            });
    }
    // const Results = () => (

    // )
    return (
        <>
            <section style={{ marginTop: "80px" }}>
                <div className="container p-3">

                    <h1>Leave Application</h1>
                    <hr />
                    <div className="main-form row">
                        <div className="mb-3 col-md-12">
                            <div className="mb-3 col-md-4">
                        <label className="form-label">From Date:</label>
                                <input type="date" className="form-control" onKeyDown={(e) => e.preventDefault()} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className=" col-md-4">
                        <label className="form-label">To Date:</label>
                                <input type="date" className="form-control" onKeyDown={(e) => e.preventDefault()} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        
                    <div className="mb-3 col-md-12">
                        <label className="form-label">Subject:</label>
                        <input type="text" className="form-control" value={Subject} onChange={(e) => setSubject(e.target.value)}/>
                    </div>
                    <div className="mb-3 col-md-12 ">
                        <label className="form-label">Discription:</label>
                        <textarea className="form-control" style={{height:"250px"}} value={Discp} onChange={(e) => setDiscp(e.target.value)}/>
                    </div>

                    <hr />
                    <div className="col-md-12 row" style={{ marginTop: "15px" }}>
                        <div className="col-md-2">
                            <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">Submit <FaArrowRight /></button>
                        </div>
                        <div className="col-md-2">
                            <button type="button" onClick={() => handleBack()} className="btn btn-secondary">Go Back <FaTimes /></button>
                        </div>
                        <div className="col-md-8">
                            <h3 style={{ color: "blue" }}>{msg}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    )

}
export default LeaveForm;