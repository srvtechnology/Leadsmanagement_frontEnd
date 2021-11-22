import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import SidePanel from "./SidePanel";
import TableList from "./TableList";

import { Table } from "react-bootstrap";
import baseUrl from './baseurl';

function BankPersonLoan() {
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
        let res = await fetch(`${baseUrl}/api/get-bpl-list/${user_id}`);
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
                <h2 style={{textAlign: "center"}}>Bank Person List</h2><hr/>
                    <TableList data={data} keys={keys} type={4} />
                </div>
            </section>
        </>
    );

}

export default BankPersonLoan;