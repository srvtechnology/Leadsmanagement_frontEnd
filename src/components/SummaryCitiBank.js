import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MSelect from "./MSelect";
import SummaryTable from "./SummaryTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";

import { Image, Modal, Button, BsCheckCircle } from "react-bootstrap";

import baseUrl from './baseurl';

function SummaryCitiBank() {
    let user = JSON.parse(localStorage.getItem('user-info'))

    const colourOptions = [
        { value: "ocean1", label: "Ocean" },
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },

    ];
    const date =new Date();
    const day = date.getDate();const day1 = date.getDate()-1;const month= date.getMonth() + 1;const year = date.getFullYear();
    const yesterday = year+'-'+month+'-'+day1
    const today = year+'-'+month+'-'+day
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [keys, setKeys] = useState([])
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(0)
    const [visible, setvisible] = useState('hidden');
    const history = useHistory()
    // useEffect(() => {
    if (!localStorage.getItem('user-info')) {
        history.push("/login")
    }

    async function showSummaryTc() {
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-citi-summary-tc/${user_id}/${startDate}/${endDate}`);
        res = await res.json();
        console.log(res)
        setData(res)
        if (res.length > 0) {
            setKeys(Object.keys(res[0]))
            setFlag(1)
        }
    }
    async function showSummaryTl() {
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-citi-summary-tl/${user_id}/${startDate}/${endDate}`);
        res = await res.json();
        console.log(res)
        setData(res)
        if (res.length > 0) {
            setKeys(Object.keys(res[0]))
            setFlag(1)
        }
    }
    async function showSummaryBm() {
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-citi-summary-bm/${user_id}/${startDate}/${endDate}`);
        res = await res.json();
        console.log(res)
        setData(res)
        if (res.length > 0) {
            setKeys(Object.keys(res[0]))
            setFlag(1)
        }
    }
    async function showData() {
        setvisible('hidden')
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-citi-data/${user_id}/${startDate}/${endDate}`);
        res = await res.json();
        setData(res)
        console.log(res)
        if (res.length > 0) {
            setKeys(Object.keys(res[0]))
            setFlag(2)
        }

    }
    // async function showDuplicate() {
    //     setvisible('hidden')
    //     let user_id = user.user_id;
    //     let res = await fetch(`${baseUrl}/api/get-citi-duplicate/${user_id}/${startDate}/${endDate}`);
    //     res = await res.json();
    //     console.log(res)
    //     setData(res)
    //     if (res.length > 0) {
    //         setKeys(Object.keys(res[0]))
    //         setFlag(3)
    //     }
    // }
    function showButton() {
        setvisible('visible')
    }
    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: "100px", justifyContent: "center" }}>
                {/* <Header /> */}
                {/* <h1 style={{ marginTop: "200px", justifyContent: "center", display: "flex" }}>Contact us comming soon</h1> */}

                <div className="row col-md-12">
                    <div className="row col-md-8">
                        <div className="col-md-4">
                            {/* <DatePicker selected={startDate} dateFormat="yyyy-mm-dd 00:00" maxDate={endDate} onChange={(date) => setStartDate(date)} onKeyDown={(e) => e.preventDefault()} />  */}
                            <input type="date" className="form-control" onKeyDown={(e) => e.preventDefault()} value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                        </div>
                        <div className="col-md-4">
                            {/* <DatePicker selected={endDate} dateFormat="yyyy-mm-dd 00:00" maxDate={endDate} onChange={(date) => setEndDate(date)} onKeyDown={(e) => e.preventDefault()} /> */}
                            <input type="date" className="form-control" onKeyDown={(e) => e.preventDefault()} value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                        </div>
                    </div>

                </div><br />
                <div className="row col-md-12">
                    {
                        user.role === 1 || user.role === 2 || user.role === 4 ?
                            <>
                                <div className="col-md-2">
                                    <Button style={{ width: "100%" }} onClick={showButton} type="button" className="btn btn-dark" >Summary</Button>
                                </div>
                                <div className="col-md-2">
                                    <Button style={{ width: "100%" }} onClick={showData} type="button" className="btn btn-warning" >Data</Button>
                                </div>
                                {/* <div className="col-md-2">
                                    <Button style={{ width: "100%" }} onClick={showDuplicate} type="button" className="btn btn-primary" >Duplicate</Button>
                                </div> */}
                            </> : <>
                                <div className="col-md-2">
                                    <Button style={{ width: "100%" }} onClick={showData} type="button" className="btn btn-warning" >Data</Button>
                                </div>
                                {/* <div className="col-md-2">
                                    <Button style={{ width: "100%" }} onClick={showDuplicate} type="button" className="btn btn-primary" >Duplicate</Button>
                                </div> */}
                            </>
                    }


                </div><hr />
                <div style={{ visibility: `${visible}` }}>
                    <div className="row col-md-12">
                        <div className="col-md-2">
                            <Button style={{ width: "100%", height: "100%" }} onClick={showSummaryTc} type="button" className="btn btn-success" >Tele Caller</Button>
                        </div>
                        <div className="col-md-2">
                            <Button style={{ width: "100%", height: "100%" }} onClick={showSummaryTl} type="button" className="btn btn-info" >Team Leader</Button>
                        </div>
                        <div className="col-md-2">
                            <Button style={{ width: "100%", height: "100%" }} onClick={showSummaryBm} type="button" className="btn btn-danger" >Branch Manager</Button>
                        </div>
                    </div><hr /></div>

                <SummaryTable data={data} keys={keys} type={flag} bank="CITI"  />
            </div>
        </>
    );


}

export default SummaryCitiBank;