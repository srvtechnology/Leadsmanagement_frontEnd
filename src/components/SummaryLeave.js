import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import SidePanel from "./SidePanel";
import TableList from "./TableList";

import { Table, Button } from "react-bootstrap";
import baseUrl from './baseurl';

function SummaryLeave() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    // let token = JSON.parse(sessionStorage.getItem('token'))
    // const [id, setId] = useState(user.id)
    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push("/login")
        }
    })
    const [keys, setKeys] = useState([])
    const [data, setData] = useState([])
    useEffect(async () => {
        let user_id= user.user_id
        let role= user.role
        let res = await fetch(`${baseUrl}/api/get-all-leave/${user_id}/${role}`);
        // let res = await fetch(`${baseUrl}/api/get-tc-list/${user_id}`);
        res = await res.json();
        console.log(res)
        setData(res)
        setKeys(Object.keys(res[0]))

    }, [])
    // console.log(data)
    return (
        <>
            <Header />
            <SidePanel />
            <section style={{ marginTop: "50px" }}>
                <div className="container">
                <h2 style={{textAlign: "center"}}>Leave Applications</h2><hr/>
                <div className="row col-md-12">
                    {
                        user.role === 2 || user.role === 3 ?
                            <>
                                <div className="col-md-3">
                                    <a href="/leave-application"><Button style={{ width: "100%" }} type="button" className="btn btn-dark" >Apply For Leave</Button></a>
                                </div>
                                
                            </>:null
                    }


                </div><br/>
                    <TableList data={data} keys={keys} type={5} />
                </div>
            </section>
        </>
    );

}

export default SummaryLeave;