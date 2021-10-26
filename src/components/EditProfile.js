import { useHistory } from "react-router-dom"
import Header from "./Header"
import SidePanel from "./SidePanel"
import { useEffect, useState } from "react"

import baseUrl from './baseurl';
function EditProfile() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const history = useHistory()
    // useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push("/login")
        }
    // })
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [aadhar, setaadhar] = useState(user.aadhar)
    const [pan, setpan] = useState(user.pan)
    const [role, setRole] = useState(user.role)
    const [id, setId] = useState(user.id)
    const [message, setMessage] = useState("")
    const [file, setSelectedfile] = useState(null);
    const [id_proof, setid_proof] = useState(user.id_proof)
    // const history = useHistory()

    function update(props) {
        
        let data = { id, name, email, phone, role, aadhar, pan }

        fetch(`${baseUrl}/api/update`,
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
                console.warn(res)

                setMessage("Data Updated Succesfully!")
                // localStorage.clear()
                localStorage.setItem("user-info", JSON.stringify(res.user))
                window.location.reload(false)

            })
            .catch(err => {
                console.warn(err.msg)


            });
    }

    function setfile(e) {
        setSelectedfile(e.target.files[0])
        // console.log(file)
    }
    function savefile() {
        const formData = new FormData()
        formData.append("file", file);
        formData.append("id", id);
        console.log(formData)
        fetch(`${baseUrl}/api/save-id-proof`,
            {
                method: 'POST',
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                localStorage.setItem("user-info",JSON.stringify(res.user))
                // window.location.reload(false)
            })
            .catch(err => {
                console.warn(err.msg)
            });
    }
    return (
        <>
            <Header />
            <SidePanel />
            <section style={{ marginTop: "100px" }}>

                <div className="auth-wrapper">
                    <Header />
                    <div className="auth-inner">
                        <form>
                            <h3>Update Your Account</h3>

                            <div className="form-group ">
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="inputName4" placeholder="Name" /><br />
                            </div>
                            <div className="form-group ">
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="inputEmail4" placeholder="Email" /><br />
                            </div>

                            <div className="form-group ">
                                <input type="text" maxLength="10" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="inputCiti" placeholder="Phone" /><br />
                            </div>
                           {/* {
                               user.role===1?
                               <>
                                <div className="form-group ">
                                <select id="inputState" className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option >Select Role</option>
                                    <option value="1">Branch Manager</option>
                                    <option value="2">Team Leader</option>
                                    <option value="3">Tele Caller</option>
                                </select>
                            </div><br />
                               </>:null
                           } */}
                            <div className="form-group ">
                                <input type="text" maxLength="12" className="form-control" value={aadhar} onChange={(e) => setaadhar(e.target.value)} id="inputName4" placeholder="Aadhaar" /><br />
                            </div>
                            <div className="form-group ">
                                <input type="text" maxLength="10" className="form-control" value={pan} onChange={(e) => setpan(e.target.value)} id="inputEmail4" placeholder="Pan" /><br />
                            </div>
                            <div className="row mb-3 col-md-12 col-12">
                                <div className="row col-md-9">
                                    <label className="form-label">ID Proof(*.jpg/*.jpeg/*.png)</label>
                                    <input type="file" style={{ marginLeft: "12px" }} className="form-control" name="file" onChange={(e) => setfile(e)} />
                                </div>
                                <div className="col-md-3" style={{ alignContent: "end", display: "grid" }}>
                                    <button className="btn-danger" style={{ marginLeft: "12px" }} onClick={savefile}>Upload</button>
                                </div>
                            </div>
                            {
                                id_proof !== null ?
                                    <>
                                        <div className="col-md-10" style={{ alignContent: "end", display: "grid", color:"green" }}>

                                            <p>Document Uploaded: <a target="_blank" href={baseUrl + `/emp_files/` + id_proof}>Id Proof</a></p>
                                        </div>
                                    </> : <></>
                            }
                            <br />

                            <div className="subdiv">
                                <button type="button" onClick={() => update()} className="btn btn-primary">Update</button>
                            </div><br />
                            <h3>{message}</h3>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
export default EditProfile