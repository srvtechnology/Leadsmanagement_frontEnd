import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowRight,FaEye,FaKey } from "react-icons/fa";
import { useLocation, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Compressor from 'compressorjs';

import baseUrl from './baseurl';

function SbiEntryForm(props) {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [flag, setFlag] = useState(0);
    const [msg, setMsg] = useState('');
    const [show, setShow] = useState(false);
    const [bank_doc, setbank_doc] = useState(null); const [bank_doc_pass, setbank_doc_pass] = useState('');
    const [salary_slip, setsalary_slip] = useState([]); const [salary_slip_pass, setsalary_slip_pass] = useState('');
    const [pan_card, setpan_card] = useState(null); const [pan_card_pass, setpan_card_pass] = useState('');
    const [aadhar_card, setaadhar_card] = useState(null); const [aadhar_card_pass, setaadhar_card_pass] = useState('');
    const [other_doc, setother_doc] = useState([]); const [other_doc_pass, setother_doc_pass] = useState('');
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
    const [bank_document, setbank_document] = useState(''); const [pancard, setpancard] = useState(''); const [aadharcard, setaadharcard] = useState(''); 
    const [sal_slip, setsal_slip]= useState([]);
    const [otherDoc, setotherDoc]= useState([]);
    const [card_limit, setcard_limit] = useState('');
    // console.log(props.match.params.id)

    const lead_id = props.match.params.id
    const history = useHistory()
    useEffect(async () => {

        let res = await fetch(`${baseUrl}/api/get-lead-sbi/${lead_id}`);
        res = await res.json();
        setsarrogate(res.lead.sarrogate); setmobile(res.lead.mobile); setpan(res.lead.pan); setsalutation(res.lead.salutation); setfname(res.lead.fname); setlname(res.lead.lname); setdob(res.lead.dob); seteducation(res.lead.education); setfather_name(res.lead.father_name); setmother_name(res.lead.mother_name); setmarital_status(res.lead.marital_status); setresi_address(res.lead.resi_address); setresi_city(res.lead.resi_city); setresi_pin(res.lead.resi_pin); setcurr_adrs_proof(res.lead.curr_adrs_proof); setresi_phone(res.lead.resi_phone); setsbi_ac(res.lead.sbi_ac); setemail(res.lead.email); setoccupation(res.lead.occupation); setdesignation(res.lead.designation); setcompany(res.lead.company); setoffice_address(res.lead.office_address); setoffice_city(res.lead.office_city); setoffice_pin(res.lead.office_pin); setoffice_phone(res.lead.office_phone); setaadhaar_linked_mobile(res.lead.aadhaar_linked_mobile); setappointment_date(res.lead.appointment_date); setappointment_time(res.lead.appointment_time); setcard_applied(res.lead.card_applied); setappointment_adrs(res.lead.appointment_adrs);
        setstatus(res.lead.status); settlstatus(res.lead.tl_status); setbank_document(res.lead.bank_document); setapplication_no(res.lead.application_no); setcomment(res.lead.comment)
        setotherDoc(JSON.parse(res.lead.other_doc));setsal_slip(JSON.parse(res.lead.salary_slip)); setpancard(res.lead.pan_card); setaadharcard(res.lead.aadhar_card)
        setlead_ref(res.lead.lead_ref); setbank_remark(res.lead.bank_remark); setcard_limit(res.lead.card_limit)
        setbank_doc_pass(res.lead.bank_pass);setsalary_slip_pass(res.lead.salary_pass);setpan_card_pass(res.lead.pan_pass);setaadhar_card_pass(res.lead.aadhar_pass);
    }, [])
    function handleBack(e) {
        history.push("/sbi-summary")
    }

    

    function handleSubmit() {
        const formData = new FormData()
        let data = {
            id,
            lead_id, salutation, fname, lname, status, comment, tlstatus, application_no, lead_ref, bank_remark,
            sarrogate, mobile, pan, dob, education, father_name, mother_name, marital_status, resi_address, resi_city,
            resi_pin, curr_adrs_proof, resi_phone, sbi_ac, email, occupation, designation, company, office_address, office_city,
            office_pin, office_phone, aadhaar_linked_mobile, appointment_date, appointment_time, card_applied, appointment_adrs, card_limit
        }
        formData.append("data",JSON.stringify(data))
        formData.append("bank_doc", bank_doc);
        formData.append("card_limit", card_limit);
        formData.append("bank_pass", bank_doc_pass);
        for (let i = 0; i < salary_slip.length; i++) {
            formData.append(`salary_slip[${i}]`, salary_slip[i])
        }
        formData.append("pan_card", pan_card);
        formData.append("aadhar_card", aadhar_card);
        for (let i = 0; i < other_doc.length; i++) {
            formData.append(`other_doc[${i}]`, other_doc[i])
        }

        fetch(`${baseUrl}/api/lead-entry-sbi`,
            {
                method: 'POST',
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.flag === 0) {
                    setMsg(res.msg);
                } else if (res.flag === 1) {
                    setMsg(res.msg)
                    setsarrogate(''); setmobile(''); setpan(''); setfname(''); setlname(''); setdob(''); seteducation(''); setfather_name(''); setmother_name('');
                    setmarital_status(''); setresi_address(''); setresi_city(''); setresi_pin(''); setcurr_adrs_proof(''); setresi_phone('');
                    setsbi_ac(''); setemail(''); setoccupation(''); setdesignation(''); setcompany(''); setoffice_address(''); setoffice_city('');
                    setoffice_pin(''); setoffice_phone(''); setaadhaar_linked_mobile(''); setappointment_date(''); setappointment_time('');
                    setcard_applied(''); setappointment_adrs(''); setcard_limit('')

                }

            })
            .catch(err => {
                console.warn(err.msg)
            });
    }
    function renderComponent() {
  const products = ['orange', 'apple', 'watermelon'];

  const list = []

  for (const [i, product] of products.entries()) {
    list.push(<li>{product}</li>)
  }

  return (
    <div>
      {list}
    </div>
  )
}
    return (
        <>
            <section style={{ marginTop: "80px" }}>
                <div className="container p-3">

                    <h1>SBI Lead Entry</h1>
                    
                    <hr />
                    <div className="main-form row">
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Salutation</label>
                            <select className="form-select" value={salutation} onChange={(e) => setsalutation(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Mr">Mr.</option>
                                <option value="Ms">Ms.</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" value={fname} onChange={(e) => setfname(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" value={lname} onChange={(e) => setlname(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">DOB</label>

                            <input type="date" className="form-control" onKeyDown={(e) => e.preventDefault()} value={dob} onChange={(e) => setdob(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">PAN</label>
                            <input type="text" className="form-control" value={pan} onChange={(e) => setpan(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Father Name</label>
                            <input type="text" className="form-control" value={father_name} onChange={(e) => setfather_name(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Mother Name</label>
                            <input type="text" className="form-control" value={mother_name} onChange={(e) => setmother_name(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Resi Address</label>
                            <textarea className="form-control" value={resi_address} onChange={(e) => setresi_address(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Resi City</label>
                            <input type="text" className="form-control" value={resi_city} onChange={(e) => setresi_city(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Resi PIN</label>
                            <input type="text" maxLength="6" className="form-control" value={resi_pin} onChange={(e) => setresi_pin(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Current Resi proof</label>
                            <select className="form-select" value={curr_adrs_proof} onChange={(e) => setcurr_adrs_proof(e.target.value)}>
                                <option value="">Current Resi proof</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Resi phone</label>
                            <input type="text" className="form-control" maxLength="10" value={resi_phone} onChange={(e) => setresi_phone(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Mobile</label>
                            <input type="text" maxLength="10" className="form-control" value={mobile} onChange={(e) => setmobile(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Occupation</label>
                            <select className="form-select" value={occupation} onChange={(e) => setoccupation(e.target.value)}>
                                <option value="">Occupation</option>
                                <option value="SL">Salaried</option>
                                <option value="SE">Self Employed</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Company</label>
                            <input type="text" className="form-control" value={company} onChange={(e) => setcompany(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Designation</label>
                            <input type="text" className="form-control" value={designation} onChange={(e) => setdesignation(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Surrogate</label>
                            <select className="form-select" value={sarrogate} onChange={(e) => setsarrogate(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Salary Slip">Salary Slip</option>
                                <option value="Other bank Card">Other bank Card</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Education</label>
                            <select className="form-select" value={education} onChange={(e) => seteducation(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Marital Status</label>
                            <select className="form-select" value={marital_status} onChange={(e) => setmarital_status(e.target.value)}>
                                <option value="">Marital Status</option>
                                <option value="N">No</option>
                                <option value="Y">Yes</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">SBI AC</label>
                            <input type="text" className="form-control" value={sbi_ac} onChange={(e) => setsbi_ac(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Office Address</label>
                            <textarea className="form-control" value={office_address} onChange={(e) => setoffice_address(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Office City</label>
                            <input type="text" className="form-control" value={office_city} onChange={(e) => setoffice_city(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Office PIN</label>
                            <input type="text" maxLength="6" className="form-control" value={office_pin} onChange={(e) => setoffice_pin(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Office Phone</label>
                            <input type="text" className="form-control" value={office_phone} onChange={(e) => setoffice_phone(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Is your aadhar linked with mobile?</label>
                            <select className="form-select" value={aadhaar_linked_mobile} onChange={(e) => setaadhaar_linked_mobile(e.target.value)}>
                                <option value="">Is your aadhar linked with mobile?</option>
                                <option value="NO">No</option>
                                <option value="YES">Yes</option>
                            </select>
                        </div>

                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Appointment Date</label>
                            <input type="date" className="form-control" onKeyDown={(e) => e.preventDefault()} value={appointment_date} onChange={(e) => setappointment_date(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Appointment Time</label>
                            <input type="time" className="form-control" value={appointment_time} onChange={(e) => setappointment_time(e.target.value)} />
                        </div>

                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Card Applied For</label>
                            <select className="form-select" value={card_applied} onChange={(e) => setcard_applied(e.target.value)}>
                                <option value="">Card Applied For</option>
                                <option value="FBB">FBB</option>
                                <option value="IRCTC">IRCTC</option>
                                <option value="BPCL">SBI BPCL</option>
                                <option value="ELITE">SBI Elite</option>
                                <option value="PRIME">SBI Prime</option>
                                <option value="CLICK">SBI Simply Click</option>
                                <option value="SAVE">SBI Simply Save</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Appointment Address</label>
                            <select className="form-select" value={appointment_adrs} onChange={(e) => setappointment_adrs(e.target.value)}>
                                <option value="">Appointment Address</option>
                                <option value="OFFICE">OFFICE</option>
                                <option value="RESI">RESI</option>
                            </select>
                        </div>
                        {
                            user.role === 1 || user.role === 6 && lead_id?
                                <>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="form-label">Application Status</label>
                                        <select className="form-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                                            <option value="0">Select</option>
                                            <option value="2">App Code Pending</option>
                                            <option value="3">App Code Received</option>
                                            <option value="4">Need Correction</option>
                                            <option value="10">e-KYC Done</option>
                                            <option value="5">Decline</option>
                                            <option value="6">Approve</option>
                                        </select>
                                    </div>

                                    {status == 4 || status == 6 ? <>
                                        <div className="mb-3 col-md-6 col-12">
                                            <label className="form-label">Remark</label>
                                            <textarea className="form-control" value={comment} onChange={(e) => setcomment(e.target.value)} />
                                        </div>
                                    </> : null}
                                    
                                </> : user.role === 2 && lead_id?
                                    <>

                                        <div className="mb-3 col-md-6 col-12">
                                            <label className="form-label">Application Status</label>
                                            <select className="form-select" value={tlstatus} onChange={(e) => settlstatus(e.target.value)}>
                                                <option value="">Select</option>
                                                <option value="Approve">QD</option>
                                                <option value="Reject">Reject</option>
                                                {
                                                    status === 2?<>
                                                        <option value="App Code Sent">App Code Sent</option>
                                                    </>:null
                                                }
                                                {
                                                    bank_remark === 'e-KYC Pending'?<>
                                                        <option value="e-KYC Done">e-KYC Done</option>
                                                    </>:null
                                                }
                                                {
                                                    bank_remark === 'Doc. Pending'?<>
                                                        <option value="Doc. Sent">Doc. Sent</option>
                                                    </>:null
                                                }
                                            </select>
                                        </div>
                                        

                                    </> : user.role === 4 ?
                                        <>
                                            <div className="mb-3 col-md-6 col-12">
                                                <label className="form-label">Application Number</label>
                                                <input type="text" className="form-control" value={application_no} onChange={(e) => setapplication_no(e.target.value)} />
                                            </div>
                                            <div className="mb-3 col-md-6 col-12">
                                                <label className="form-label">Lead Reference</label>
                                                <input type="text" className="form-control" value={lead_ref} onChange={(e) => setlead_ref(e.target.value)} />
                                            </div>

                                            <div className="mb-3 col-md-6 col-12">
                                                <label className="form-label">Application Status</label>
                                                <select className="form-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                                                    <option value="0">Select</option>
                                                    <option value="2">App Code Pending</option>
                                                    <option value="3">App Code Received</option>
                                                    <option value="9">App Code Not Received</option>
                                                    <option value="4">Need Correction</option>
                                                    <option value="5">Decline</option>
                                                    <option value="6">Approve</option>
                                                    <option value="8">Card booked</option>
                                                </select>
                                            </div>
                                            {status == 6 ? <>
                                                <div className="mb-3 col-md-6 col-12">
                                                    <label className="form-label">Bank Remark</label>
                                                    <select className="form-select" value={bank_remark} onChange={(e) => setbank_remark(e.target.value)}>
                                                        <option value="0">Select</option>
                                                        <option value="e-KYC Pending">e-KYC Pending</option>
                                                        <option value="v-KYC Pending">v-KYC Pending</option>
                                                        <option value="Doc. Pending">Doc. Pending</option>
                                                        <option value="Doc. Verified">Doc. Verified</option>
                                                    </select>
                                                </div>
                                            </> : null}
                                            {status == 4 || status == 6 || tlstatus == 'App Code Send' ? <>
                                                <div className="mb-3 col-md-6 col-12">
                                                    <label className="form-label">Remark</label>
                                                    <textarea className="form-control" value={comment} onChange={(e) => setcomment(e.target.value)} />
                                                </div>
                                            </> : null}
                                            {status == 8 ? <>
                                                <div className="mb-3 col-md-6 col-12">
                                                    <label className="form-label">Card Limit</label>
                                                    <input type="text" className="form-control" value={card_limit} onChange={(e) => setcard_limit(e.target.value)} />

                                                </div>
                                            </> : null}

                                        </> : <></>
                        }
                        
                        {/* <div className="row mb-3 col-md-6 col-12" style={{marginLeft: "auto"}}> */}

                        {
                            user.role === 1 || user.role === 6 || user.role === 2 ? <>
                                <div className="col-md-12">
                                    <label className="form-label col-md-2" style={{ fontWeight: "bolder" }}>Bank Statement. </label>
                                    <input type="file"  name="image" onChange={(e) => setbank_doc(e.target.files[0])} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label col-md-4" style={{ fontWeight: "bolder" }}>Bank Doc. Passcode </label>
                                    <input type="text" name="bankpass" style={{ width: "225px" }} value={bank_doc_pass} onChange={(e) => setbank_doc_pass(e.target.value)} />
                                </div>

                                <hr />
                                <div className="col-md-12">
                                    <label className="form-label col-md-2" style={{ fontWeight: "bolder" }}>Salary Slip </label>
                                    <input type="file"  name="image" onChange={(e) => setsalary_slip(e.target.files)}  multiple />
                                </div>
                                {/* <div className="col-md-6">
                                    <label className="form-label col-md-4" style={{ fontWeight: "bolder" }}>Salary Slip Passcode </label>
                                    <input type="text" name="bankpass" style={{ width: "225px" }} value={salary_slip_pass} onChange={(e) => setsalary_slip_pass(e.target.value)} />

                                </div> */}
                                <hr />
                                <div className="col-md-12">
                                    <label className="form-label col-md-2" style={{ fontWeight: "bolder" }}>Pan Card</label>
                                    <input type="file"  name="image" onChange={(e) => setpan_card(e.target.files[0])} />
                                </div>
                                {/* <div className="col-md-6">
                                    <label className="form-label col-md-4" style={{ fontWeight: "bolder" }}>Pan Card Passcode </label>
                                    <input type="text" name="bankpass" style={{ width: "225px" }} value={pan_card_pass} onChange={(e) => setpan_card_pass(e.target.value)} />

                                </div> */}
                                <hr />
                                <div className="col-md-12">
                                    <label className="form-label col-md-2" style={{ fontWeight: "bolder" }}>Aadhaar Card</label>
                                    <input type="file"  name="image" onChange={(e) => setaadhar_card(e.target.files[0])} />
                                </div>
                                {/* <div className="col-md-6">
                                    <label className="form-label col-md-4" style={{ fontWeight: "bolder" }}>Aadhaar Passcode </label>
                                    <input type="text" name="bankpass" style={{ width: "225px" }} value={aadhar_card_pass} onChange={(e) => setaadhar_card_pass(e.target.value)} />

                                </div> */}
                                <hr />
                                <div className="col-md-12">
                                    <label className="form-label col-md-2" style={{ fontWeight: "bolder" }}>Other Document</label>
                                    <input type="file"  name="image" onChange={(e) => setother_doc(e.target.files)}  multiple />


                                </div>
                                {/* <div className="col-md-6">
                                    <label className="form-label col-md-4" style={{ fontWeight: "bolder" }}>Other Doc Passcode </label>
                                    <input type="text" name="otherdocpass" style={{ width: "225px" }} value={other_doc_pass} onChange={(e) => setother_doc_pass(e.target.value)} />

                                </div> */}
                                <hr />
                            </> : null

                        }
                        <div className="col-md-12 row">

                        {
                            bank_document !== null && lead_id ?
                                <>
                                    <div className="col-md-2" style={{ justifyContent: "center", display: "grid" }}>

                                        <a target="_blank" href={baseUrl + `/files/` + bank_document}><button><FaEye /> Bank Stmt.</button></a>
                                        <span><FaKey /> {bank_doc_pass}</span>
                                    </div>
                                </> : null

                        }
                        {
                            sal_slip !== null && lead_id?
                                <>
                                    <div className="col-md-2" style={{ justifyContent: "center", display: "grid" }}>

                                        {/* <a target="_blank" href={baseUrl + `/files/` + sal_slip}><button><FaEye /> Salary Slip</button></a> */}
                                        {/* <span><FaKey /> {salary_slip_pass}</span> */}
                                        {
                                           
                                           sal_slip.map((item,index) => {
                                           return <a target="_blank" href={baseUrl + `/files/` + item}>
                                                   <button><FaEye /> Salary Slip{index+1}</button></a>;
                                           })
                                           
                                       }
                                        
                                        
                                    </div>
                                </> : null

                        }
                        {
                            pancard !== null && lead_id?
                                <>
                                    <div className="col-md-2" style={{ justifyContent: "center", display: "grid" }}>

                                        <a target="_blank" href={baseUrl + `/files/` + pancard}><button><FaEye /> Pan Card</button></a>
                                        {/* <span><FaKey /> {pan_card_pass}</span> */}
                                    </div>
                                </> : null

                        }
                        {
                            aadharcard !== null && lead_id?
                                <>
                                    <div className="col-md-2" style={{ justifyContent: "center", display: "grid" }}>

                                        <a target="_blank" href={baseUrl + `/files/` + aadharcard}><button><FaEye /> Aadhaar</button></a>
                                        {/* <span><FaKey /> {aadhar_card_pass}</span> */}
                                    </div>
                                </> : null

                        }
                        {
                            otherDoc !== null && lead_id?
                                <>
                                    <div className="col-md-2" style={{ justifyContent: "center", display: "grid" }}>

                                        {/* <a target="_blank" href={baseUrl + `/files/` + otherDoc}><button><FaEye /> Other Doc</button></a> */}
                                        {/* <span><FaKey /> {other_doc_pass}</span> */}
                                        {
                                           
                                            otherDoc.map((item,index) => {
                                            return <a target="_blank" href={baseUrl + `/files/` + item}>
                                                    <button><FaEye /> Other Doc{index+1}</button></a>;
                                            })
                                            
                                        }
                                    </div>
                                </> : null

                        }
                        </div>
<hr />
                        <div className="col-md-6 row" style={{ marginTop: "15px" }}>
                            <div className="col-md-3">
                                <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">Submit <FaArrowRight /></button>
                            </div>
                            <div className="col-md-3">
                                <button type="button" onClick={() => handleBack()} className="btn btn-secondary">Go Back <FaTimes /></button>
                            </div>
                            <div className="col-md-6">
                                <h3 style={{ color: "blue" }}>{msg}</h3>
                            </div>
                        </div>


                    </div>


                </div>
            </section>
            
        </>
    )

}
export default SbiEntryForm;