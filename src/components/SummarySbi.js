import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MSelect from "./MSelect";
import SummaryTable from "./SummaryTable";
import DatePicker from "react-datepicker";
import Header from "./Header";

import "react-datepicker/dist/react-datepicker.css";
import { Image, Modal, Button, BsCheckCircle } from "react-bootstrap";

import baseUrl from './baseurl';

function SummarySbi() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    
    const colourOptions = [
        { value: "ocean1", label: "Ocean" },
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },

    ];
    const [keys, setKeys] = useState([])
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(0)
    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push("/login")
        }
    })
    // useEffect(async () => {
    //     let res = await fetch(`${baseUrl}/api/get-lead-sbi`);
    //     res = await res.json();
    //     setData(res)
    //     setKeys(Object.keys(res[0]))

    // }, [])

    async function showSummary(){
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-sbi-summary/${user_id}`);
        res = await res.json();
        console.log(res)
        setData(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(1)
        }        
    }
    async function showData(){
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-sbi-data/${user_id}`);
        res = await res.json();
        setData(res)
        console.log(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(2)
        }
        
    }
    async function showDuplicate(){
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-sbi-duplicate/${user_id}`);
        res = await res.json();
        console.log(res)
        setData(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(3)
        }        
    }
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
        <Header/>
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
               
            </div><br />
            <div className="row col-md-12">
                {/* <div className="col-md-9 row"> */}
                    <div className="col-md-2">
                        <Button style={{width: "100%"}} onClick={showSummary} type="button" className="btn btn-dark" >Summary</Button>
                    </div>
                    <div className="col-md-2">
                        <Button style={{width: "100%"}} onClick={showData} type="button" className="btn btn-warning" >Data</Button>
                    </div>
                    <div className="col-md-2">
                        <Button style={{width: "100%"}} onClick={showDuplicate} type="button" className="btn btn-primary" >Duplicate</Button>
                    </div>
                    
                {/* </div> */}
                
            </div><br/>
            <SummaryTable data={data} keys={keys} type={flag} bank="SBI"/>  
        </div>
        </>
    );


}

export default SummarySbi;   