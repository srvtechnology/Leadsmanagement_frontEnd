import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowRight,FaEye,FaKey } from "react-icons/fa";
import { useLocation, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Compressor from 'compressorjs';

import baseUrl from './baseurl';

function ViewSbiLead(props) {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [flag, setFlag] = useState(0);
    const [msg, setMsg] = useState('');
    const [m1, setM1] = useState(''); const [m2, setM2] = useState(''); const [m3, setM3] = useState(''); const [m4, setM4] = useState('');
    const [show, setShow] = useState(false);
    const [bank_doc, setbank_doc] = useState(null);const [bank_doc_pass,setbank_doc_pass]= useState('');
    const [salary_slip, setsalary_slip] = useState(null);const [salary_slip_pass,setsalary_slip_pass]= useState('');
    const [pan_card, setpan_card] = useState(null);const [pan_card_pass,setpan_card_pass]= useState('');
    const [aadhar_card, setaadhar_card] = useState(null);const [aadhar_card_pass,setaadhar_card_pass]= useState('');
    const [id, setId] = useState(user.id)
    const [application_no, setapplication_no] = useState('')
    const [image, setSelectedImage] = useState(null);
    const [showm, setShowm] = useState(false);
    const handleClose = () => setShowm(false);
    const handleShow = () => setShowm(true);
    const [lead_ref, setlead_ref] = useState('');
    const [bank_remark, setbank_remark] = useState('')
    const [salutation, setsalutation] = useState(''); const [fname, setfname] = useState(''); const [lname, setlname] = useState('');
    const [sarrogate, setsarrogate] = useState(''); const [mobile, setmobile] = useState(''); const [pan, setpan] = useState(''); const [dob, setdob] = useState(''); const [education, seteducation] = useState(''); const [father_name, setfather_name] = useState('');
    const [mother_name, setmother_name] = useState(''); const [marital_status, setmarital_status] = useState(''); const [resi_address, setresi_address] = useState(''); const [resi_city, setresi_city] = useState(''); const [resi_pin, setresi_pin] = useState(''); const [curr_adrs_proof, setcurr_adrs_proof] = useState('');
    const [resi_phone, setresi_phone] = useState(''); const [sbi_ac, setsbi_ac] = useState(''); const [email, setemail] = useState(''); const [occupation, setoccupation] = useState(''); const [designation, setdesignation] = useState(''); const [company, setcompany] = useState('');
    const [office_address, setoffice_address] = useState(''); const [office_city, setoffice_city] = useState(''); const [office_pin, setoffice_pin] = useState(''); const [office_phone, setoffice_phone] = useState(''); const [aadhaar_linked_mobile, setaadhaar_linked_mobile] = useState(''); const [appointment_date, setappointment_date] = useState(''); const [appointment_time, setappointment_time] = useState('');
    const [card_applied, setcard_applied] = useState(''); const [appointment_adrs, setappointment_adrs] = useState(''); const [status, setstatus] = useState(0); const [comment, setcomment] = useState(''); const [tlstatus, settlstatus] = useState('');
    const [bank_document, setbank_document] = useState(''); const [sal_slip, setsal_slip] = useState('');
    const [pancard, setpancard] = useState(''); const [aadharcard, setaadharcard] = useState(''); const [card_limit, setcard_limit] = useState('');
    // console.log(props.match.params.id)

    const lead_id = props.match.params.id
    const history = useHistory()
    useEffect(async () => {

        let res = await fetch(`${baseUrl}/api/get-lead-sbi/${lead_id}`);
        res = await res.json();
        setsarrogate(res.lead.sarrogate); setmobile(res.lead.mobile); setpan(res.lead.pan); setsalutation(res.lead.salutation); setfname(res.lead.fname); setlname(res.lead.lname); setdob(res.lead.dob); seteducation(res.lead.education); setfather_name(res.lead.father_name); setmother_name(res.lead.mother_name); setmarital_status(res.lead.marital_status); setresi_address(res.lead.resi_address); setresi_city(res.lead.resi_city); setresi_pin(res.lead.resi_pin); setcurr_adrs_proof(res.lead.curr_adrs_proof); setresi_phone(res.lead.resi_phone); setsbi_ac(res.lead.sbi_ac); setemail(res.lead.email); setoccupation(res.lead.occupation); setdesignation(res.lead.designation); setcompany(res.lead.company); setoffice_address(res.lead.office_address); setoffice_city(res.lead.office_city); setoffice_pin(res.lead.office_pin); setoffice_phone(res.lead.office_phone); setaadhaar_linked_mobile(res.lead.aadhaar_linked_mobile); setappointment_date(res.lead.appointment_date); setappointment_time(res.lead.appointment_time); setcard_applied(res.lead.card_applied); setappointment_adrs(res.lead.appointment_adrs);
        setstatus(res.lead.status); settlstatus(res.lead.tl_status); setbank_document(res.lead.bank_document); setapplication_no(res.lead.application_no); setcomment(res.lead.comment)
        setsal_slip(res.lead.salary_slip); setpancard(res.lead.pan_card); setaadharcard(res.lead.aadhar_card)
        setlead_ref(res.lead.lead_ref); setbank_remark(res.lead.bank_remark); setcard_limit(res.lead.card_limit)
        setbank_doc_pass(res.lead.bank_pass);setsalary_slip_pass(res.lead.salary_pass);setpan_card_pass(res.lead.pan_pass);setaadhar_card_pass(res.lead.aadhar_pass);
    }, [])
    function handleBack(e) {
        history.push("/sbi-summary")
    }
    return (
        <>
            <section style={{ marginTop: "80px", justifyContent:"center" }}>
                <div className="container p-3">

                    <h1>SBI Lead Data</h1>
                    <hr />
                    <div className="main-form row" style={{ justifyContent:"center" }}>
                        {/* <div className="mb-3 col-md-6 col-12"> */}
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong>Name:</strong></div>
                            <div className="col-md-8">{salutation} {fname} {lname}</div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >DOB:</strong></div>
                            <div className="col-md-8"><span>{dob}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >PAN:</strong></div>
                            <div className="col-md-8"><span>{pan}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Father Name:</strong></div>
                            <div className="col-md-8"><span>{father_name}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Mother Name:</strong></div>
                            <div className="col-md-8"><span>{mother_name}</span></div>
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
                            <div className="col-md-4"><strong >Resident Phone:</strong></div>
                            <div className="col-md-8"><span>{resi_phone}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Mobile:</strong></div>
                            <div className="col-md-8"><span>{mobile}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Email:</strong></div>
                            <div className="col-md-8"><span>{email}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Occupation:</strong></div>
                            <div className="col-md-8"><span>{occupation}</span></div>
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
                            <div className="col-md-4"><strong >Surrogate:</strong></div>
                            <div className="col-md-8"><span>{sarrogate}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Education:</strong></div>
                            <div className="col-md-8"><span>{education}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Marital Status:</strong></div>
                            <div className="col-md-8"><span>{marital_status}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >SBI Account:</strong></div>
                            <div className="col-md-8"><span>{sbi_ac}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office Address:</strong></div>
                            <div className="col-md-8"><span>{office_address}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office Citi:</strong></div>
                            <div className="col-md-8"><span>{office_city}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office PIN:</strong></div>
                            <div className="col-md-8"><span>{office_pin}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Office Phone:</strong></div>
                            <div className="col-md-8"><span>{office_phone}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Aadhaar linked with mobile?:</strong></div>
                            <div className="col-md-8"><span>{aadhaar_linked_mobile}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Appointment Date:</strong></div>
                            <div className="col-md-8"><span>{appointment_date}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Appointment Time:</strong></div>
                            <div className="col-md-8"><span>{appointment_time}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Card Applied For:</strong></div>
                            <div className="col-md-8"><span>{card_applied}</span></div>
                        </div>
                        <div className="col-md-12 row">
                            <div className="col-md-4"><strong >Appointment Address:</strong></div>
                            <div className="col-md-8"><span>{appointment_adrs}</span></div>
                        </div>


                    
                       
<hr />

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
export default ViewSbiLead;