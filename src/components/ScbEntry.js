import React, { useState , useEffect} from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import baseUrl from './baseurl';

function ScbEntry(props) {
    const [msg,setMsg]= useState('');
    const [file, setSelectedfile] = useState(null);
    const [application_no, setapplication_no] = useState('')
    const [status, setstatus] = useState(0);const [comment, setcomment] = useState('');
    const [card_type, setcard_type] = useState(''); const [mobile, setmobile] = useState(''); const [pan, setpan] = useState('');
    const [name, setname] = useState(''); const [dob, setdob] = useState(''); const [birth_place, setbirth_place] = useState('');
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
    const [bank_document, setbank_document] = useState('');
    let user = JSON.parse(localStorage.getItem('user-info'))
    const lead_id = props.match.params.id
    
    useEffect(async () => {
        if(lead_id >0){

            let res = await fetch(`${baseUrl}/api/get-lead-scb/${lead_id}`);
            res = await res.json();
            console.log(res)
            setcard_type(res.lead.card_type);setmobile(res.lead.mobile);setpan(res.lead.pan);setname(res.lead.name);setdob(res.lead.dob);setbirth_place(res.lead.birth_place);
            setaadhaar(res.lead.aadhaar);setaadhaar_linked_mobile(res.lead.aadhaar_linked_mobile);setmother_name(res.lead.mother_name);setfather_name(res.lead.father_name);
            setdependent(res.lead.dependent);setresi_address(res.lead.resi_address);setresi_city(res.lead.resi_city);setresi_pin(res.lead.resi_pin);setresi_status(res.lead.resi_status);
            setcurrent_rest_time(res.lead.current_rest_time);setemail(res.lead.email);setmarital_status(res.lead.marital_status);setspouse_name(res.lead.spouse_name);setcompany(res.lead.company);
            setdesignation(res.lead.designation);setcurrent_company_experience(res.lead.current_company_experience);settotal_experience(res.lead.total_experience);setoffice_email(res.lead.office_email);
            setpf(res.lead.pf);setoffice_address(res.lead.office_address);setoffice_city(res.lead.office_city);setoffice_pin(res.lead.office_pin);setoffice_landline(res.lead.office_landline);
            setcomm_address(res.lead.comm_address);setnature_of_bussiness(res.lead.nature_of_bussiness);setindustry(res.lead.industry);
            setbank_document(res.lead.bank_document);settlstatus(res.lead.tl_status);setstatus(res.lead.status);setcomment(res.lead.comment)
            setapplication_no(res.lead.application_no);setcomment(res.lead.comment)
        }
        
    }, [])
    function setfile(e) {
        setSelectedfile(e.target.files[0])
        // console.log(file)
    }
    function savefile() {
        const formData = new FormData()
        formData.append("file", file);
        formData.append("id", lead_id);
        console.log(formData)
        fetch(`${baseUrl}/api/save-file-scb`,
            {
                method: 'POST',
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                // localStorage.setItem("user-info",JSON.stringify(res.user))
                // window.location.reload(false)
            })
            .catch(err => {
                console.warn(err.msg)
            });
    }
    function handleSubmit() {
        let data = {tc: user.user_id,role:2,lead_id,status, comment, tlstatus, application_no,
            office_city, card_type, mobile, pan, name, dob, birth_place, aadhaar, aadhaar_linked_mobile,
            mother_name, father_name, dependent, resi_address, resi_city, resi_pin, resi_status, current_rest_time,
            email, marital_status, spouse_name, company, designation, current_company_experience, total_experience,
            office_email, pf, office_address, office_pin, office_landline, comm_address, nature_of_bussiness, industry
        }

        fetch(`${baseUrl}/api/lead-entry-scb`,
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
                if (res.flag === 0) {
                    setMsg(res.msg)
                } else if(res.flag === 1){
                    setMsg(res.msg);
                    // setcard_type(''); setmobile(''); setpan(''); setname(''); setdob(''); setbirth_place(''); setaadhaar('');
                    // setaadhaar_linked_mobile(''); setmother_name(''); setfather_name(''); setdependent(''); setresi_address('');
                    // setresi_city(''); setresi_pin(''); setresi_status(''); setcurrent_rest_time(''); setemail('');
                    // setmarital_status(''); setspouse_name(''); setcompany(''); setdesignation(''); setcurrent_company_experience('');
                    // settotal_experience(''); setoffice_email(''); setpf(''); setoffice_address(''); setoffice_city(''); setoffice_pin('');
                    // setoffice_landline(''); setcomm_address(''); setnature_of_bussiness(''); setindustry('')
                }


            })
            .catch(err => {
                console.warn(err.msg)
            });
    }
    const history = useHistory();
    function handleBack(e){
        history.push("/scb-summary")
    }
    return (
        <section style={{ marginTop: "100px" }}>
            <div className="container p-3">
                <h1>SCB Lead Entry</h1>
                <h3 style={{ color: "red", textAlign: "end" }}>*{comment}</h3><hr/>
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
                        <label className="form-label">Mobile</label>
                        <input type="text" className="form-control" maxLength="10" value={mobile} onChange={(e) => setmobile(e.target.value)} />
                    </div>
                    <div className="mb-3 col-md-6 col-12">
                        <label className="form-label">PAN</label>
                        <input type="text" className="form-control" value={pan} onChange={(e) => setpan(e.target.value)} />
                    </div>
                    <div className="mb-3 col-md-6 col-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setname(e.target.value)} />
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
                        <label className="form-label">Resi City</label>
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
                        user.role === 1 ?
                            <>
                                <div className="mb-3 col-md-6 col-12">
                                    <label className="form-label">Application Status</label>
                                    <select className="form-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                                        <option value="0">Select</option>
                                        <option value="1">QD</option>
                                        <option value="2">App Code Pending</option>
                                        <option value="3">App Code Received</option>
                                        <option value="4">Need Correction</option>
                                        <option value="5">Decline</option>
                                        <option value="6">Approve</option>
                                    </select>
                                </div>

                                {status == 4 ? <>
                                            <div className="mb-3 col-md-6 col-12">
                                                <label className="form-label">Remark</label>
                                                <textarea className="form-control" value={comment} onChange={(e) => setcomment(e.target.value)} />
                                            </div>
                                        </> : null}
                            </> : user.role === 2 ?
                                <>

                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="form-label">Application Status</label>
                                        <select className="form-select" value={tlstatus} onChange={(e) => settlstatus(e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="Approve" >Approve</option>
                                            <option value="Reject">Reject</option>
                                            <option value="App Code Send">App Code Send</option>
                                        </select>
                                    </div>
                                    <div className="row mb-3 col-md-6 col-12">
                                        <div className="row col-md-6">
                                            <label className="form-label">Upload Bank Statement</label>
                                            <input type="file" style={{ marginLeft: "12px" }} className="form-control" name="file" onChange={(e) => setfile(e)} />
                                        </div>
                                        <div className="col-md-3" style={{ alignContent: "end", display: "grid" }}>
                                            <Button variant="dark" style={{ marginLeft: "12px" }} onClick={savefile}>Upload</Button>
                                        </div>
                                        {
                                            bank_document !== null ?
                                                <>
                                                    <div className="col-md-3" style={{ alignContent: "end", display: "grid" }}>

                                                        <p>View Document <a target="_blank" href={baseUrl + `/files/` + bank_document}>Bank Statement</a>.</p>
                                                    </div>
                                                </> : <></>
                                        }
                                    </div>

                                </> :user.role === 4 ?
                                    <>
                                        <div className="mb-3 col-md-6 col-12">
                                            <label className="form-label">Application Status</label>
                                            <select className="form-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                                                <option value="0">Select</option>
                                                <option value="1">QD</option>
                                                <option value="2">App Code Pending</option>
                                                <option value="3">App Code Received</option>
                                                <option value="4">Need Correction</option>
                                                <option value="5">Decline</option>
                                                <option value="6">Approve</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 col-md-6 col-12">
                                            <label className="form-label">Application Number</label>
                                            <input type="text" className="form-control" value={application_no} onChange={(e) => setapplication_no(e.target.value)} />
                                        </div>
                                        {status == 4 || tlstatus == 'App Code Send' ? <>
                                            <div className="mb-3 col-md-6 col-12">
                                                <label className="form-label">Remark</label>
                                                <textarea className="form-control" value={comment} onChange={(e) => setcomment(e.target.value)} />
                                            </div>
                                        </> : null}

                                    </> : <></>
                    }
                    <hr/>
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
    )
}
export default ScbEntry;