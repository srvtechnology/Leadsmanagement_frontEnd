import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import SidePanel from "./SidePanel";
import TableList from "./TableList";
import { Image, Modal, Button, Table } from "react-bootstrap";
import baseUrl from './baseurl';

function TeamLeader() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    // let token = JSON.parse(sessionStorage.getItem('token'))
    // const [id, setId] = useState(user.id)
    const [keys, setKeys] = useState([])
    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push("/login")
        }
    })
    const [data, setData] = useState([])
    useEffect(async () => {
        let user_id= user.user_id
        let res = await fetch(`${baseUrl}/api/get-tl-list/${user_id}`);
        res = await res.json();
        setData(res)
        setKeys(Object.keys(res[0]))

    }, [])
    console.log(data)
    return (
        <>
            <Header />
            <SidePanel />
            <section style={{ marginTop: "50px" }}>
                <div className="container">
                <h2 style={{textAlign: "center"}}>Team Leader List</h2>
                    <TableList data={data} keys={keys} type={2}/>
                </div>
            </section>
        </>
    );

}

export default TeamLeader;