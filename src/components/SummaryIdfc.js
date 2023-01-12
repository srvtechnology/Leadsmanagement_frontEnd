import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MSelect from "./MSelect";
import SummaryTable from "./SummaryTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Image, Modal, Button } from "react-bootstrap";
import baseUrl from './baseurl';
import "jspdf-autotable";
import jsPDF from "jspdf";
import {FaFileDownload} from "react-icons/fa";

function SummaryIdfc() {
    let user = JSON.parse(localStorage.getItem('user-info'))

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
    const date =new Date();
    const day = date.getDate();const day1 = date.getDate()-(day-1);const month= date.getMonth() + 1;const year = date.getFullYear();
    const yesterday = year+'-'+month+'-0'+day1
    const today = day < 10 ? year+'-'+month+'-0'+day : year+'-'+month+'-'+day
    const [startDate, setStartDate] = useState(yesterday);
    const [endDate, setEndDate] = useState(today);    const [flag, setFlag] = useState(0)
    const [visible, setvisible] = useState('hidden');
    function showButton() {
        setvisible('visible')
    }
    async function showSummaryTc(){
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-idfc-summary-tc/${user_id}/${startDate}/${endDate}`);
        res = await res.json();
        setData(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(1)
        }        
    }
    async function showSummaryTl(){
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-idfc-summary-tl/${user_id}/${startDate}/${endDate}`);
        res = await res.json();
        setData(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(1)
        }        
    }
    async function showSummaryBm(){
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-idfc-summary-bm/${user_id}/${startDate}/${endDate}`);
        res = await res.json();
        setData(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(1)
        }        
    }
    async function showData(){
        let user_id = user.user_id;
        let res = await fetch(`${baseUrl}/api/get-idfc-data/${user_id}/${startDate}/${endDate}`);
        res = await res.json();
        console.log(res)
        setData(res)
        if(res.length >0){
            setKeys(Object.keys(res[0]))
            setFlag(2)
        }
        
    }

    function reportPDF(){
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "My Report";
        const headers =[keys];
    
        const tabledata = data.map(elt=> [elt.ID, elt.Date, elt.FIRST_NAME, elt.LAST_NAME, elt.PAN, elt.TC, 
            elt.TL, elt.BM, elt.APPLICATION_NO,  elt.TL_STATUS, elt.STATUS, elt.REMARK]);
            
    
        let content = {
          startY: 50,
          head: headers,
          body: tabledata
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
      }
    function exportPDF(){
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "My Report";
        const headers =[keys];
    
        const tabledata = data.map(elt=> [elt.TC, elt.TL, elt.BM,  elt.lead, elt.CPV, elt.CPV_reject, elt.Need_correction, elt.api, 
            elt.api_decline, elt.api_approve, elt.aadhar_auth_pending, elt.aadhar_auth_done, elt.e_sign_pending, elt.e_sign_done, 
            elt.v_KYC_pending, elt.v_KYC_done, elt.Card_booked,elt.Card_reject,]);
            
            
    
        let content = {
          startY: 50,
          head: headers,
          body: tabledata
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
      }
    return (
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
                        user.role === 1 || user.role === 6 || user.role === 2 || user.role === 4 ?
                            <>
                                <div className="col-md-2">
                                    <Button style={{ width: "100%" }} onClick={showButton} type="button" className="btn btn-dark" >Summary</Button>
                                </div>
                                <div className="col-md-2">
                                    <Button style={{ width: "100%" }} onClick={showData} type="button" className="btn btn-warning" >Data</Button>
                                </div>
                               
                                
                            </> : <>
                                <div className="col-md-2">
                                    <Button style={{ width: "100%" }} onClick={showData} type="button" className="btn btn-warning" >Data</Button>
                                </div>
                                
                                <div className="col-md-2">
                            <Button style={{ width: "100%", height: "100%" }} onClick={reportPDF} type="button" className="btn btn-secondary" ><FaFileDownload /> Report PDF</Button>
                        </div>
                                
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
                        <div className="col-md-2">
                            <Button style={{ width: "100%", height: "100%" }} onClick={exportPDF} type="button" className="btn btn-secondary" ><FaFileDownload /> Get Report</Button>
                        </div>
                    </div><hr /></div>
            <SummaryTable data={data} keys={keys} type={flag} bank="IDFC" getData={showData}/>
        </div>
    );

}

export default SummaryIdfc;