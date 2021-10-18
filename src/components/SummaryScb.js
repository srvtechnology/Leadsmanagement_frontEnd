import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MSelect from "./MSelect";
import SummaryTable from "./SummaryTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Image, Modal, Button } from "react-bootstrap";
import baseUrl from './baseurl';


function ContactUs() {
    const colourOptions = [
        { value: "ocean1", label: "Ocean" },
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },

    ];
    const [keys, setKeys] = useState([])
    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push("/login")
        }
    })
    const [data, setData] = useState([])
    useEffect(async () => {
        let res = await fetch(`${baseUrl}/api/get-lead-list`);
        res = await res.json();
        setData(res)
        setKeys(Object.keys(res[0]))

    }, [])
    const [startDate, setStartDate] = useState(new Date());
    const [flag, setFlag] = useState(0)
    async function showSummary(){
        let res = await fetch(`${baseUrl}/api/get-scb-summary`);
        res = await res.json();
        setData(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(1)
        }        
    }
    async function showData(){
        let res = await fetch(`${baseUrl}/api/get-scb-data`);
        res = await res.json();
        console.log(res)
        setData(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(2)
        }
        
    }
    return (
        <div className="container" style={{ marginTop: "100px", justifyContent: "center" }}>
            {/* <Header /> */}
            {/* <h1 style={{ marginTop: "200px", justifyContent: "center", display: "flex" }}>Contact us comming soon</h1> */}

            <div className="row col-md-12">
                <div className="row col-md-6">
                    <div className="col-md-3">
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="col-md-3">
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                {/* <div className="row col-md-10">
                <div className="col-md-2">
                    <MSelect data={colourOptions} />
                </div>
                <div className="col-md-2">
                    <MSelect data={colourOptions} />
                </div>
                <div className="col-md-2">
                    <MSelect data={colourOptions} />
                </div>
                <div className="col-md-2">
                    <MSelect data={colourOptions} />
                </div>
                <div className="col-md-2">
                    <MSelect data={colourOptions} />
                </div>
                </div> */}
            </div><br />
            <div className="row col-md-12">
                {/* <div className="col-md-9 row"> */}
                <div className="col-md-2">
                    <Button style={{ width: "100%" }} onClick={showSummary} type="button" className="btn btn-dark" >Summary</Button>
                </div>
                <div className="col-md-2">
                    <Button style={{ width: "100%" }} onClick={showData} type="button" className="btn btn-warning" >Data</Button>
                </div>
                {/* <div className="col-md-2">
                        <Button style={{width: "100%"}} type="button" className="btn btn-primary" >Time Trend</Button>
                    </div>
                    <div className="col-md-2">
                        <Button style={{width: "100%"}} type="button" className="btn btn-success" >Day Trend</Button>
                    </div>
                    <div className="col-md-2">
                        <Button style={{width: "100%"}} type="button" className="btn btn-danger" >MTD Trend</Button>
                    </div>
                    <div className="col-md-2">
                        <Button style={{width: "100%"}} type="button" className="btn btn-primary" >Month Trend</Button>
                    </div> */}
                {/* </div> */}

            </div><br />
            <SummaryTable data={data} keys={keys} type={flag} bank="SCB"/>
        </div>
    );

}

export default ContactUs;