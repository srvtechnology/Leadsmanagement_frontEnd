import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowRight,FaEye,FaKey } from "react-icons/fa";
import { useLocation, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Compressor from 'compressorjs';

import baseUrl from './baseurl';

function ViewLoanLead(props) {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [msg, setMsg] = useState('');
    const [file, setSelectedfile] = useState(null);
    const [application_no, setapplication_no] = useState('');
    const [m1, setM1] = useState(''); const [m2, setM2] = useState(''); const [m3, setM3] = useState(''); const [m4, setM4] = useState('');
    const [bank_doc, setbank_doc] = useState(null);const [bank_doc_pass,setbank_doc_pass]= useState('');
    const [salary_slip, setsalary_slip] = useState(null);const [salary_slip_pass,setsalary_slip_pass]= useState('');
    const [pan_card, setpan_card] = useState(null);const [pan_card_pass,setpan_card_pass]= useState('');
    const [aadhar_card, setaadhar_card] = useState(null);const [aadhar_card_pass,setaadhar_card_pass]= useState('');
    const [salutation, setsalutation] = useState(''); const [fname, setfname] = useState(''); const [lname, setlname] = useState('');
    const [status, setstatus] = useState(0); const [comment, setcomment] = useState('');
    const [card_type, setcard_type] = useState(''); const [mobile, setmobile] = useState(''); const [pan, setpan] = useState('');
    const [dob, setdob] = useState(''); const [birth_place, setbirth_place] = useState('');
    const [aadhaar, setaadhaar] = useState(''); const [aadhaar_linked_mobile, setaadhaar_linked_mobile] = useState('');
    const [mother_name, setmother_name] = useState(''); const [father_name, setfather_name] = useState(''); const [dependent, setdependent] = useState('');
    const [resi_address, setresi_address] = useState(''); const [resi_city, setresi_city] = useState(''); const [resi_pin, setresi_pin] = useState('');
    const [resi_status, setresi_status] = useState(''); const [current_rest_time, setcurrent_rest_time] = useState(''); const [email, setemail] = useState('');
    const [marital_status, setmarital_status] = useState(''); const [spouse_name, setspouse_name] = useState(''); const [company, setcompany] = useState('');
    const [designation, setdesignation] = useState(''); const [current_company_experience, setcurrent_company_experience] = useState('');
    const [total_experience, settotal_experience] = useState(''); const [office_email, setoffice_email] = useState(''); const [pf, setpf] = useState('');
    const [office_address, setoffice_address] = useState(''); const [office_city, setoffice_city] = useState(''); const [office_pin, setoffice_pin] = useState('');
    const [office_landline, setoffice_landline] = useState(''); const [comm_address, setcomm_address] = useState('');
    const [nature_of_bussiness, setnature_of_bussiness] = useState(''); const [industry, setindustry] = useState('');
    const [tlstatus, settlstatus] = useState('');
    const [bank_document, setbank_document] = useState(''); const [sal_slip, setsal_slip] = useState(''); const [pancard, setpancard] = useState(''); const [aadharcard, setaadharcard] = useState('');
    const [lead_ref, setlead_ref] = useState(''); const [bank_remark, setbank_remark] = useState(''); const [card_limit, setcard_limit] = useState('');
    const loan_id = props.match.params.loan_id
    const bank = props.match.params.bank
    const [showm, setShowm] = useState(false);
    const handleClose = () => setShowm(false);
    const handleShow = () => setShowm(true);
    useEffect(async () => {
        if (loan_id > 0) {

            let res = await fetch(`${baseUrl}/api/get-lead-loan/${loan_id}`);
            res = await res.json();
            console.log(res)
            setmobile(res.lead.mobile); setpan(res.lead.pan); setsalutation(res.lead.salutation); setfname(res.lead.fname); setlname(res.lead.lname); setdob(res.lead.dob); setbirth_place(res.lead.birth_place); setaadhaar(res.lead.aadhaar); setaadhaar_linked_mobile(res.lead.aadhaar_linked_mobile); setmother_name(res.lead.mother_name); setfather_name(res.lead.father_name); setdependent(res.lead.dependent); setresi_address(res.lead.resi_address); setresi_city(res.lead.resi_city); setresi_pin(res.lead.resi_pin); setresi_status(res.lead.resi_status); setcurrent_rest_time(res.lead.current_rest_time); setemail(res.lead.email); setmarital_status(res.lead.marital_status); setspouse_name(res.lead.spouse_name); setcompany(res.lead.company); setdesignation(res.lead.designation); setcurrent_company_experience(res.lead.current_company_experience); settotal_experience(res.lead.total_experience); setoffice_email(res.lead.office_email); setpf(res.lead.pf); setoffice_address(res.lead.office_address); setoffice_city(res.lead.office_city); setoffice_pin(res.lead.office_pin); setoffice_landline(res.lead.office_landline);
            setcomm_address(res.lead.comm_address); setnature_of_bussiness(res.lead.nature_of_bussiness); setindustry(res.lead.industry);
            setbank_document(res.lead.bank_document); settlstatus(res.lead.tl_status); setstatus(res.lead.status); setcomment(res.lead.comment)
            setapplication_no(res.lead.application_no); setcomment(res.lead.comment); setsal_slip(res.lead.salary_slip); setpancard(res.lead.pan_card); setaadharcard(res.lead.aadhar_card);
            setbank_doc_pass(res.lead.bank_pass);setsalary_slip_pass(res.lead.salary_pass);setpan_card_pass(res.lead.pan_pass);setaadhar_card_pass(res.lead.aadhar_pass);
            
        }

    }, [])
    const history = useHistory()
    function handleBack(e) {
        history.push(`/loan-summary/${bank}`)
    }
    return (
        <>
            <section style={{ marginTop: "80px", justifyContent:"center" }}>
                <div className="container p-3">

                    <h1>{bank} Lead Data</h1>
                    <hr />
                    <div className="main-form row" style={{ justifyContent:"center" }}>
                        {/* <div className="mb-3 col-md-6 col-12"> */}
                       
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong>Name:</strong></div>
                            <div className="col-md-8">{salutation} {fname} {lname}</div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Mobile:</strong></div>
                            <div className="col-md-8"><span>{mobile}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >PAN:</strong></div>
                            <div className="col-md-8"><span>{pan}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >DOB:</strong></div>
                            <div className="col-md-8"><span>{dob}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Birth Place:</strong></div>
                            <div className="col-md-8"><span>{birth_place}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Aadhaar:</strong></div>
                            <div className="col-md-8"><span>{aadharcard}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Aadhaar linked with mobile?:</strong></div>
                            <div className="col-md-8"><span>{aadhaar_linked_mobile}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Mother Name:</strong></div>
                            <div className="col-md-8"><span>{mother_name}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Father Name:</strong></div>
                            <div className="col-md-8"><span>{father_name}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Resident Address:</strong></div>
                            <div className="col-md-8"><span>{resi_address}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Resident Citi:</strong></div>
                            <div className="col-md-8"><span>{resi_city}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Resident PIN:</strong></div>
                            <div className="col-md-8"><span>{resi_pin}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Resident Status:</strong></div>
                            <div className="col-md-8"><span>{resi_status}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Email:</strong></div>
                            <div className="col-md-8"><span>{email}</span></div>
                        </div>
                       
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Marital Status:</strong></div>
                            <div className="col-md-8"><span>{marital_status}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Spouse Name:</strong></div>
                            <div className="col-md-8"><span>{spouse_name}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Company:</strong></div>
                            <div className="col-md-8"><span>{company}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Designation:</strong></div>
                            <div className="col-md-8"><span>{designation}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Current Company Experience:</strong></div>
                            <div className="col-md-8"><span>{current_company_experience}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Total Experience:</strong></div>
                            <div className="col-md-8"><span>{total_experience}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office Email:</strong></div>
                            <div className="col-md-8"><span>{office_email}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >PF:</strong></div>
                            <div className="col-md-8"><span>{pf}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office Address:</strong></div>
                            <div className="col-md-8"><span>{office_address}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office City:</strong></div>
                            <div className="col-md-8"><span>{office_city}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office PIN:</strong></div>
                            <div className="col-md-8"><span>{office_pin}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office Landline:</strong></div>
                            <div className="col-md-8"><span>{office_landline}</span></div>
                        </div>
                        
                        
                       
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Comm Address:</strong></div>
                            <div className="col-md-8"><span>{comm_address}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Nature Of Bussiness:</strong></div>
                            <div className="col-md-8"><span>{nature_of_bussiness}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Industry:</strong></div>
                            <div className="col-md-8"><span>{industry}</span></div>
                        </div> <hr />

                            {
                                bank_document !== null ?
                                    <>
                                        <div className="col-md-3" style={{ justifyContent: "center", display: "grid" }}>

                                            <a target="_blank" href={baseUrl + `/files/` + bank_document}><button><FaEye/> Bank Stmt.</button></a>
                                            <p><FaKey/> {bank_doc_pass}</p>
                                        </div>
                                    </> : null

                            }
                            {
                                sal_slip !== null ?
                                    <>
                                        <div className="col-md-3" style={{ justifyContent: "center", display: "grid" }}>

                                            <a target="_blank" href={baseUrl + `/files/` + sal_slip}><button><FaEye/> Salary Slip</button></a>
                                            <p><FaKey/> {salary_slip_pass}</p>
                                        </div>
                                    </> : null

                            }
                            {
                                pancard !== null ?
                                    <>
                                        <div className="col-md-3" style={{ justifyContent: "center", display: "grid" }}>

                                            <a target="_blank" href={baseUrl + `/files/` + pancard}><button><FaEye/> Pan Card</button></a>
                                            <p><FaKey/> {pan_card_pass}</p>
                                        </div>
                                    </> : null

                            }
                            {
                                aadharcard !== null ?
                                    <>
                                        <div className="col-md-3" style={{ justifyContent: "center", display: "grid" }}>

                                            <a target="_blank" href={baseUrl + `/files/` + aadharcard}><button><FaEye/> Aadhaar</button></a>
                                            <p><FaKey/> {aadhar_card_pass}</p>
                                        </div>
                                    </> : null

                            }

                        <br />

                        <hr />
                        <div className="col-md-12 row" style={{ marginTop: "15px", justifyContent:"center" }}>
                            
                            
                                <button type="button" onClick={() => handleBack()} 
                                style={{ width: "auto"}}
                                className="btn btn-secondary">Go Back <FaTimes /></button>
                            
                        </div>
                        


                    </div>


                </div>
            </section>
           
        </>
    )

}
export default ViewLoanLead;