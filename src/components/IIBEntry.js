import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowRight,FaEye,FaKey } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import baseUrl from './baseurl';

function IIBEntry(props) {
    const [msg, setMsg] = useState('');
    const [file, setSelectedfile] = useState(null);
    const [application_no, setapplication_no] = useState('');
    const [bank_doc, setbank_doc] = useState(null); const [bank_doc_pass, setbank_doc_pass] = useState('');
    const [salary_slip, setsalary_slip] = useState([]); const [salary_slip_pass, setsalary_slip_pass] = useState('');
    const [pan_card, setpan_card] = useState(null); const [pan_card_pass, setpan_card_pass] = useState('');
    const [aadhar_card, setaadhar_card] = useState(null); const [aadhar_card_pass, setaadhar_card_pass] = useState('');
    const [other_doc, setother_doc] = useState([]); const [other_doc_pass, setother_doc_pass] = useState('');
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
    const [bank_document, setbank_document] = useState(''); const [pancard, setpancard] = useState(''); const [aadharcard, setaadharcard] = useState(''); 
    const [sal_slip, setsal_slip]= useState([]);
    const [otherDoc, setotherDoc]= useState([]);
    const [lead_ref, setlead_ref] = useState(''); const [bank_remark, setbank_remark] = useState(''); const [card_limit, setcard_limit] = useState('');
    let user = JSON.parse(localStorage.getItem('user-info'))
    const lead_id = props.match.params.id
    const [showm, setShowm] = useState(false);
    const handleClose = () => setShowm(false);
    const handleShow = () => setShowm(true);

    useEffect(async () => {
        if (lead_id > 0) {

            let res = await fetch(`${baseUrl}/api/get-lead-iib/${lead_id}`);
            res = await res.json();
            console.log(res)
            setcard_type(res.lead.card_type); setmobile(res.lead.mobile); setpan(res.lead.pan); setsalutation(res.lead.salutation); setfname(res.lead.fname); setlname(res.lead.lname); setdob(res.lead.dob); setbirth_place(res.lead.birth_place); setaadhaar(res.lead.aadhaar); setaadhaar_linked_mobile(res.lead.aadhaar_linked_mobile); setmother_name(res.lead.mother_name); setfather_name(res.lead.father_name); setdependent(res.lead.dependent); setresi_address(res.lead.resi_address); setresi_city(res.lead.resi_city); setresi_pin(res.lead.resi_pin); setresi_status(res.lead.resi_status); setcurrent_rest_time(res.lead.current_rest_time); setemail(res.lead.email); setmarital_status(res.lead.marital_status); setspouse_name(res.lead.spouse_name); setcompany(res.lead.company); setdesignation(res.lead.designation); setcurrent_company_experience(res.lead.current_company_experience); settotal_experience(res.lead.total_experience); setoffice_email(res.lead.office_email); setpf(res.lead.pf); setoffice_address(res.lead.office_address); setoffice_city(res.lead.office_city); setoffice_pin(res.lead.office_pin); setoffice_landline(res.lead.office_landline);
            setcomm_address(res.lead.comm_address); setnature_of_bussiness(res.lead.nature_of_bussiness); setindustry(res.lead.industry);
            setbank_document(res.lead.bank_document); settlstatus(res.lead.tl_status); setstatus(res.lead.status); setcomment(res.lead.comment)
            setapplication_no(res.lead.application_no); setcomment(res.lead.comment); setotherDoc(JSON.parse(res.lead.other_doc));setsal_slip(JSON.parse(res.lead.salary_slip)); setpancard(res.lead.pan_card); setaadharcard(res.lead.aadhar_card);
            setbank_doc_pass(res.lead.bank_pass);setsalary_slip_pass(res.lead.salary_pass);setpan_card_pass(res.lead.pan_pass);setaadhar_card_pass(res.lead.aadhar_pass);
            
        }

    }, [])
    
    function handleSubmit() {
        const formData = new FormData()
        let data = {
            id: user.user_id, role: user.role, lead_id, status, comment, tlstatus, application_no, lead_ref, bank_remark,
            salutation, fname, lname, office_city, card_type, mobile, pan, dob, birth_place, aadhaar, aadhaar_linked_mobile,
            mother_name, father_name, dependent, resi_address, resi_city, resi_pin, resi_status, current_rest_time,
            email, marital_status, spouse_name, company, designation, current_company_experience, total_experience,
            office_email, pf, office_address, office_pin, office_landline, comm_address, nature_of_bussiness, industry
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

        fetch(`${baseUrl}/api/lead-entry-iib`,
            {
                method: 'POST',
                body: formData,
                
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.flag === 0) {
                    setMsg(res.msg)
                } else if (res.flag === 1) {
                    setMsg(res.msg);
                    setcard_type(''); setmobile(''); setpan(''); setfname(''); setdob(''); setbirth_place(''); setaadhaar('');
                    setaadhaar_linked_mobile(''); setmother_name(''); setfather_name(''); setdependent(''); setresi_address('');
                    setresi_city(''); setresi_pin(''); setresi_status(''); setcurrent_rest_time(''); setemail('');
                    setmarital_status(''); setspouse_name(''); setcompany(''); setdesignation(''); setcurrent_company_experience('');
                    settotal_experience(''); setoffice_email(''); setpf(''); setoffice_address(''); setoffice_city(''); setoffice_pin('');
                    setoffice_landline(''); setcomm_address(''); setnature_of_bussiness(''); setindustry('')
                }


            })
            .catch(err => {
                console.warn(err.msg)
            });
    }
    const history = useHistory();
    function handleBack(e) {
        history.push("/iib-summary")
    }
    return (
        <>
            <section style={{ marginTop: "100px" }}>
                <div className="container p-3">
                    <h1>IIB Lead Entry</h1>
                    <hr />
                    <div className="main-form row">
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Card Type</label>
                            <select className="form-select" value={card_type} onChange={(e) => setcard_type(e.target.value)}>
                                <option value="">Card Type</option>
                                <option value="DIGI_CARD">Digi Card</option>
                                <option value="MANHATTAN_PLATINUM">Manhattan Platinum</option>
                                <option value="PLATINUM_250">Platinum 250</option>
                            </select>
                        </div>
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
                            <label className="form-label">Mobile</label>
                            <input type="text" className="form-control" maxLength="10" value={mobile} onChange={(e) => setmobile(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">PAN</label>
                            <input type="text" className="form-control" value={pan} onChange={(e) => setpan(e.target.value)} />
                        </div>

                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">DOB</label>
                            <input type="date" className="form-control" value={dob} onChange={(e) => setdob(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Birth Place</label>
                            <input type="text" className="form-control" value={birth_place} onChange={(e) => setbirth_place(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">AADHAAR</label>
                            <input type="text" className="form-control" maxLength="12" value={aadhaar} onChange={(e) => setaadhaar(e.target.value)} />
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
                            <label className="form-label">Mother Name</label>
                            <input type="text" className="form-control" value={mother_name} onChange={(e) => setmother_name(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Father Name</label>
                            <input type="text" className="form-control" value={father_name} onChange={(e) => setfather_name(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Dependent</label>
                            <select className="form-select" value={dependent} onChange={(e) => setdependent(e.target.value)}>
                                <option value="">Dependent</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Resi Address</label>
                            <textarea className="form-control" value={resi_address} onChange={(e) => setresi_address(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Resi Citi</label>
                            <input type="text" className="form-control" value={resi_city} onChange={(e) => setresi_city(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Resi PIN</label>
                            <input type="text" maxLength="6" className="form-control" value={resi_pin} onChange={(e) => setresi_pin(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Resi Status</label>
                            <select className="form-select" value={resi_status} onChange={(e) => setresi_status(e.target.value)}>
                                <option value="">Resi Status</option>
                                <option value="OWNED">Owned</option>
                                <option value="RENTED">Rented</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Current Resi Time</label>
                            <input type="text" className="form-control" value={current_rest_time} onChange={(e) => setcurrent_rest_time(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} />
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
                            <label className="form-label">Spouse Name</label>
                            <input type="text" className="form-control" value={spouse_name} onChange={(e) => setspouse_name(e.target.value)} />
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
                            <label className="form-label">Current Company Experience</label>
                            <input type="text" className="form-control" value={current_company_experience} onChange={(e) => setcurrent_company_experience(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Total Experience</label>
                            <input type="text" className="form-control" value={total_experience} onChange={(e) => settotal_experience(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Office Email</label>
                            <input type="email" className="form-control" value={office_email} onChange={(e) => setoffice_email(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">PF</label>
                            <input type="text" className="form-control" value={pf} onChange={(e) => setpf(e.target.value)} />
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
                            <label className="form-label">Office Landline</label>
                            <input type="text" className="form-control" value={office_landline} onChange={(e) => setoffice_landline(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Comm. Address</label>
                            <select className="form-select" value={comm_address} onChange={(e) => setcomm_address(e.target.value)}>
                                <option value="">Comm. Address</option>
                                <option value="OFFICE">Office</option>
                                <option value="RESI">Resi</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Nature of Business</label>
                            <input type="text" className="form-control" value={nature_of_bussiness} onChange={(e) => setnature_of_bussiness(e.target.value)} />
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label">Industry</label>
                            <input type="text" className="form-control" value={industry} onChange={(e) => setindustry(e.target.value)} />
                        </div>
                        {
                            user.role === 1 || user.role === 6 && lead_id ?
                                <>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="form-label">Application Status</label>
                                        <select className="form-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                                            <option value="0">Select</option>
                                            <option value="20">CPV</option>
                                            <option value="21">Lead Reject</option>
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
                                                <option value="Approve">Lead Approve</option>
                                                <option value="Reject">Lead Reject</option>
                                                {
                                                    status === 14 ? <>
                                                        <option value="v-KYC Done">v-KYC Done</option>
                                                    </> : null
                                                }
                                                {
                                                    status === 30 ? <>
                                                        <option value="e-Sign Done">e-Sign Done</option>
                                                    </> : null
                                                }
                                                {
                                                    status === 31 ? <>
                                                        <option value="Aadhaar Auth Done">Aadhaar Auth Done</option>
                                                    </> : null
                                                }
                                            </select>
                                        </div>
                                       
                                        


                                    </> : user.role === 4 ?
                                        <>


                                            <div className="mb-3 col-md-6 col-12">
                                                <label className="form-label">Application Status</label>
                                                <select className="form-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                                                    <option value="0">Select</option>
                                                    <option value="4">Need Correction</option>
                                                    <option value="8">Card booked</option>
                                                    <option value="10">e-KYC Done</option>
                                                    <option value="32">Login</option>
                                                    <option value="5">Decline</option>
                                                </select>
                                            </div>

                                            {status == 10 ? <>
                                                <div className="mb-3 col-md-6 col-12">
                                                    <label className="form-label">Application Number</label>
                                                    <input type="text" className="form-control" value={application_no} onChange={(e) => setapplication_no(e.target.value)} />
                                                </div>
                                            </> : null}
                                            {status == 5 || status == 4  ? <>
                                                <div className="mb-3 col-md-6 col-12">
                                                    <label className="form-label">Remark</label>
                                                    <textarea className="form-control" value={comment} onChange={(e) => setcomment(e.target.value)} />
                                                </div>
                                            </> : null}
                                            {/* {status == 8 ? <>
                                                <div className="mb-3 col-md-6 col-12">
                                                    <label className="form-label">Card Limit</label>
                                                    <input type="text" className="form-control" value={card_limit} onChange={(e) => setcard_limit(e.target.value)} />

                                                </div>
                                            </> : null} */}

                                        </> : <></>
                        }<hr />
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
export default IIBEntry;