import { BsFillTrashFill, BsPencilSquare, BsCheckCircle, BsXCircle, BsFillGrid3X3GapFill, BsCheckAll, BsX } from "react-icons/bs"
import { Modal } from "react-bootstrap";
import { FaEye } from "react-icons/fa";

import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import ReactTooltip from "react-tooltip";

import baseUrl from './baseurl';

export default class SummaryTable extends React.Component {
  // state = {
  //   searchText: '',
  //   searchedColumn: '',
  // };
  constructor(props) {
    super(props);
    this.panAccept = this.panAccept.bind(this);
    this.panReject = this.panReject.bind(this);
    this.deleteleadSbi = this.deleteleadSbi.bind(this);
    this.deleteleadScb = this.deleteleadScb.bind(this);
    this.deleteleadCiti = this.deleteleadCiti.bind(this);
    this.deleteleadHdfc = this.deleteleadHdfc.bind(this);
    this.state = {
      show: false,
      searchText: '',
      searchedColumn: '',
      setShow: '',
      list: [],
      tc: '',
      tl: '',
      tableData: '',
      redirect: null,
      pagination: {
        pageSize: 100,
      },
    };
    this.user = JSON.parse(localStorage.getItem('user-info'))
  }
  // this.deleteMe = this.deleteMe.bind(this);
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  onCloseModal = () => {
    this.setState({ show: false })
  }

  panReject = (record, props) => {
    // console.log(record, "reject")
    let data = { lead_id: record.ID, code: 0 }
    this.state.tableData = "dwwk"
    console.log(this.props.tableData);
    if (window.confirm("Reject PAN for " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/bm-pan-sbi`, data)
        .then(function (res) {
          console.log(res.data);
          props.getDuplicate()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  }


  panAccept = (record, props) => {

    // this.setState({ tc: record.USER_ID })
    // console.log(record, "accept")
    let data = { lead_id: record.ID, code: 1 }
    if (window.confirm("Confirm PAN for " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/bm-pan-sbi`, data)
        .then(function (res) {
          console.log(res.data);
          props.getDuplicate()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  };


  deleteleadSbi = (record, props) => {
    // console.log(record.USER_ID)
    let data = { id: record.ID }
    if (window.confirm("Delete user " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/delete-sbi-lead`, data)
        .then(function (res) {
          console.log(res.data);
          props.getDuplicate()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  }

  deleteleadScb = (record, props) => {
    // console.log(record.USER_ID)
    let data = { id: record.ID }
    if (window.confirm("Delete user " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/delete-scb-lead`, data)
        .then(function (res) {
          console.log(res.data);
          props.getData()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  }

  deleteleadCiti = (record, props) => {
    // console.log(record.USER_ID)
    let data = { id: record.ID }
    if (window.confirm("Delete user " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/delete-citi-lead`, data)
        .then(function (res) {
          console.log(res.data);
          props.getData()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  }

  deleteleadHdfc = (record, props) => {
    console.log(record.ID)
    let data = { id: record.ID }
    if (window.confirm("Delete user " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/delete-hdfc-lead`, data)
        .then(function (res) {
          console.log(res.data);
          props.getData()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  }

  deleteleadIIB = (record, props) => {
    // console.log(record.USER_ID)
    let data = { id: record.ID }
    if (window.confirm("Delete user " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/delete-iib-lead`, data)
        .then(function (res) {
          console.log(res.data);
          props.getData()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  }
  deleteleadHsbc = (record, props) => {
    // console.log(record.USER_ID)
    let data = { id: record.ID }
    if (window.confirm("Delete user " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/delete-hsbc-lead`, data)
        .then(function (res) {
          console.log(res.data);
          props.getData()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  }
  deleteleadLoan = (record, props) => {
    // console.log(record.USER_ID)
    let data = { id: record.ID }
    if (window.confirm("Delete Loan of " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/delete-loan-lead`, data)
        .then(function (res) {
          console.log(res.data);
          props.getData()
        })
        .catch(function (res) {
          console.log(res);
        });

    } else {
      return false;
    }
  }
  render() {

    const columns = [];
    // this.props.keys.push("ACTION")
    const data = [];
    var a = 0; var b = 0; var c = 0; var d = 0; var e = 0; var f = 0; var g = 0; var h = 0; var i = 0;
    for (var j = 0; j < this.props.data.length; j++) {
      data.push(this.props.data[j])
      if (this.props.type === 1) {
        a += this.props.data[j].Verification_pending
        b += this.props.data[j].QD
        c += this.props.data[j].App_code_pending
        d += this.props.data[j].App_code_received
        e += this.props.data[j].Need_correction
        f += this.props.data[j].Decline
        g += this.props.data[j].Approve
        h += this.props.data[j].e_KYC_Done
        i += this.props.data[j].Card_booked
      }
    }
    if (this.props.type === 1) {
      data.push({
        TC: '', TL: '', BM: <h3>TOTAL</h3>, Verification_pending: <h3>{a}</h3>, QD: <h3>{b}</h3>, App_code_pending: <h3>{c}</h3>, App_code_received: <h3>{d}</h3>,
        Need_correction: <h3>{e}</h3>, Decline: <h3>{f}</h3>, Approve: <h3>{g}</h3>, e_KYC_Done: <h3>{h}</h3>, Card_booked: <h3>{i}</h3>
      })
    }
    for (var i = 0; i < this.props.keys.length; i++) {
      var id = i

      if (this.props.keys[i] === 'STATUS' && this.props.type === 2) {
        columns.push({
          title: 'STATUS',
          dataIndex: 'STATUS',
          render: text => <>
            {
              text == "App Code Pending" ?
                <>
                  <p style={{ fontWeight: "bold", color: "#ffca00" }}>{text}</p>
                    </> : text == "QD Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "#ff6b00" }}>{text}</p>
                    </> : text == "QD" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "#ff6b00" }}>{text}</p>
                    </> : text == "Need Correction" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "crimson" }}>{text}</p>
                    </> : text == "App Code Received" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "App Code Not Received" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "rebeccapurple" }}>{text}</p>
                    </> : text == "e-KYC Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "rebeccapurple" }}>{text}</p>
                    </> : text == "v-KYC Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "rebeccapurple" }}>{text}</p>
                    </> : text == "e-KYC Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "orangered" }}>{text}</p>
                    </> : text == "v-KYC Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "orangered" }}>{text}</p>
                    </> : text == "e-Sign Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "red" }}>{text}</p>
                    </> : text == "Aadhaar Auth Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "orangered" }}>{text}</p>
                    </> : text == "e-Sign Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "rebeccapurple" }}>{text}</p>
                    </> : text == "Aadhaar Auth Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "rebeccapurple" }}>{text}</p>
                    </> : text == "Doc. Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "orangered" }}>{text}</p>
                    </> : text == "Doc. Uploaded" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "rebeccapurple" }}>{text}</p>
                    </> : text == "Lead Approve" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "green" }}>{text}</p>
                      </> : text == "Approve" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "green" }}>{text}</p>
                    </> : text == "Decline" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "red" }}>{text}</p>
                    </> : text == "Card Reject" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "red" }}>{text}</p>
                    </> : text == "Lead Verification Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "#ff6b00" }}>{text}</p>
                    </> : text == "Card Booked" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "darkgreen" }}>{text}</p>
                    </> : text == "Dip Call Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "palevioletred" }}>{text}</p>
                    </> : text == "e-Sign Mail Sent" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "palevioletred" }}>{text}</p>
                    </> : text == "Call Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "palevioletred" }}>{text}</p>
                      </> : text == "Login" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "Dip Call Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "#ff6b00" }}>{text}</p>
                    </> : text == "e-Sign Mail Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "#ff6b00" }}>{text}</p>
                    </> : text == "Call Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "#ff6b00" }}>{text}</p>
                    </> : text == "Lead" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "yellow" }}>{text}</p>
                    </> : text == "CPV" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "red" }}>{text}</p>
                    </> : text == "CPV Reject" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "AIP" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "yellowgreen" }}>{text}</p>
                    </> : text == "AIP Approved" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "orangered" }}>{text}</p>
                    </> : text == "AIP Declined" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "red" }}>{text}</p>
                    </> : text == "e-Sign Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "rosybrown" }}>{text}</p>
                      </> : text == "Disbursed" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "rosybrown" }}>{text}</p>
                    </> :<></>
            }
          </>,
        })
      } else if (this.props.keys[i] === 'STATUS' && this.props.type === 3) {
        columns.push({
          title: 'STATUS',
          dataIndex: 'STATUS',
          render: text => <>
            {
              text == "OK" ?
                <>
                  <p style={{ fontWeight: "bold", color: "green" }}>{text}</p>
                </> : text == "NOK" ?
                  <>
                    <p style={{ fontWeight: "bold", color: "red" }}>{text}</p>
                  </> :
                  <></>
            }
          </>,
        })
      } else if (this.props.keys[i] === 'TL_STATUS' && this.props.type === 2) {
        columns.push({
          title: 'TL_STATUS',
          dataIndex: 'TL_STATUS',
          render: text => <>
            {
              text == "Approve" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "green" }}>{text}</p>
                    </> : text == "Reject" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "red" }}>{text}</p>
                    </> : text == "App Code Sent" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "darkmagenta" }}>{text}</p>
                    </> : text == "e-KYC Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "orangered" }}>{text}</p>
                    </> : text == "v-KYC Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "orangered" }}>{text}</p>
                    </> : text == "Doc. Pending" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "orangered" }}>{text}</p>
                    </> : text == "e-KYC Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "v-KYC Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "e-Sign Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "Aadhaar Auth Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "Doc. Uploaded" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "e-Sign Mail Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>
                    </> : text == "Call Done" ?
                    <>
                      <p style={{ fontWeight: "bold", color: "blue" }}>{text}</p>

                    </> :
                    <></>
            }
          </>,
        })
      } else {

        columns.push({
          title: this.props.keys[i],
          dataIndex: this.props.keys[i],
          key: this.props.keys[i],
          width: 'auto',
          ...this.getColumnSearchProps(this.props.keys[i]),
        })
      }

    }
    if (this.props.type !== 1) {
      columns.push({
        title: 'Action', dataIndex: 'Action', width: 'auto', key: 'operation', fixed: 'right',
        render: (text, record) => <a>

          
          {
            this.props.type === 3 ?
              <>
                {
                  this.user.role === 1 || this.user.role === 6 || this.user.role === 4 || this.user.role === 5 ?
                    <>
                      <span>  </span><button onClick={(e) => this.panAccept(record, this.props)}><BsCheckCircle /></button>
                      <span>   </span><button onClick={() => this.panReject(record, this.props)}><BsXCircle /></button>
                      {
                        this.props.bank === 'SBI' && record.STATUS === 'OK' ? <>
                          <span>  </span>
                          <Link to={`/edit-sbi-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                        </> : this.props.bank === 'SCB' && record.STATUS === 'OK' ?
                          <>
                            <span>  </span>
                            <Link to={`/edit-scb-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                          </> : <></>}
                    </> : this.user.role === 3 || this.user.role === 4 || this.user.role === 5 || this.user.role === 2 ?
                      <>
                        {this.props.bank === 'SBI' && record.STATUS === 'OK' ? <>
                          <span>  </span>
                          <Link to={`/edit-sbi-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                        </> : this.props.bank === 'SCB' && record.STATUS === 'OK' ?
                          <>
                            <span>  </span>
                            <Link to={`/edit-scb-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                          </> : this.props.bank === 'IIB' && record.STATUS === 'OK' ?
                            <>
                              <span>  </span>
                              <Link to={`/edit-iib-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                            </> : this.props.bank === 'HSBC' && record.STATUS === 'OK' ?
                              <>
                                <span>  </span>
                                <Link to={`/edit-hsbc-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                                </> : this.props.bank === 'LOAN' && record.STATUS === 'OK' ?
                              <>
                                <span>  </span>
                                <Link to={`/edit-loan-entry/${record.BANK}/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>

                              </> : <></>}
                      </> : <></>
                }
              </>
              :
              this.props.type === 2 ?
                <>

                  {this.props.bank === 'SBI' ? <>
                    <span> </span><Link to={`/edit-sbi-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                    <span> </span><Link to={`/view-sbi-entry/${record.ID}`}><button data-tip data-for="registerTip"><FaEye /></button></Link>

                    {
                      this.user.role === 1 || this.user.role === 6 ? <>
                        <span>   </span><button data-tip data-for="delete" onClick={() => this.deleteleadSbi(record, this.props)}><BsFillTrashFill /></button>

                      </> : null
                    }

                  </> : this.props.bank === 'SCB' ?
                    <>
                      <span> </span><Link to={`/edit-scb-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                      <span> </span><Link to={`/view-scb-entry/${record.ID}`}><button data-tip data-for="registerTip"><FaEye /></button></Link>

                      {
                        this.user.role === 1 || this.user.role === 6 ? <>
                          <span> </span><button data-tip data-for="delete" onClick={() => this.deleteleadScb(record, this.props)}><BsFillTrashFill /></button>
                        </> : null
                      }
                    </> : this.props.bank === 'IIB' ?
                      <>
                        <span> </span><Link to={`/edit-iib-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                        <span> </span><Link to={`/view-iib-entry/${record.ID}`}><button data-tip data-for="registerTip"><FaEye /></button></Link>

                        {
                          this.user.role === 1 || this.user.role === 6 ? <>
                            <span> </span><button data-tip data-for="delete" onClick={() => this.deleteleadIIB(record, this.props)}><BsFillTrashFill /></button>
                          </> : null
                        }
                      </> : this.props.bank === 'HSBC' ?
                        <>
                          <span> </span><Link to={`/edit-hsbc-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                          <span> </span><Link to={`/view-hsbc-entry/${record.ID}`}><button data-tip data-for="registerTip"><FaEye /></button></Link>

                          {
                            this.user.role === 1 || this.user.role === 6 ? <>
                              <span> </span><button data-tip data-for="delete" onClick={() => this.deleteleadHsbc(record, this.props)}><BsFillTrashFill /></button>
                            </> : null
                          }
                        </> : this.props.bank === 'CITI' ?
                          <>
                            <span>  </span>
                            <Link to={`/edit-citi-bank-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                            <span>  </span>
                            <Link to={`/view-citi-bank-entry/${record.ID}`}><button data-tip data-for="registerTip"><FaEye /></button></Link>

                            {
                              this.user.role === 1 || this.user.role === 6 ?
                                <>
                                  <span>   </span><button data-tip data-for="delete" onClick={() => this.deleteleadCiti(record, this.props)}><BsFillTrashFill /></button>
                                </> : null
                            }
                          </> : this.props.bank === 'HDFC' ?
                            <>
                              <span>  </span>
                              <Link to={`/edit-hdfc-bank-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                              <span>  </span>
                              <Link to={`/view-hdfc-bank-entry/${record.ID}`}><button data-tip data-for="registerTip"><FaEye /></button></Link>

                              {
                                this.user.role === 1 || this.user.role === 6 ?
                                  <>
                                    <span>   </span><button data-tip data-for="delete" onClick={() => this.deleteleadHdfc(record, this.props)}><BsFillTrashFill /></button>
                                  </> : null
                              }
                               </> : this.props.bank === 'LOAN' ?
                            <>
                              <span>  </span>
                              <Link to={`/edit-loan-bank-entry/${record.ID}/${record.BANK}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                              <span>  </span>
                              <Link to={`/view-loan-bank-entry/${record.ID}/${record.BANK}`}><button data-tip data-for="registerTip"><FaEye /></button></Link>

                              {
                                this.user.role === 1 || this.user.role === 6 ?
                                  <>
                                    <span>   </span><button data-tip data-for="delete" onClick={() => this.deleteleadLoan(record, this.props)}><BsFillTrashFill /></button>
                                  </> : null
                              }

                            </> : <></>}
                </> :
                this.props.type === 1 && this.user.role === 2 ?
                  <>
                    <span>  </span><button onClick={(e) => this.panAccept(record)}><BsFillGrid3X3GapFill /></button>
                  </> : <></>
          }
          {/* </>:<></>
          } */}
          <ReactTooltip id="registerTip" place="top" effect="solid">Proceed To Fill-up</ReactTooltip>
          <ReactTooltip id="tlAprove" place="top" effect="solid">Approve By TL</ReactTooltip>
          <ReactTooltip id="tlDisAprove" place="top" effect="solid">Disapprove By TL</ReactTooltip>

        </a>,

      })
    }
    let leaderList = this.state.list.length > 0
      && this.state.list.map((item, i) => {
        return (
          <option key={i} value={item.USER_ID}>{item.NAME}</option>
        )
      }, this);
    const { pagination } = this.state;
    return (
      <>

        {
          this.props.type === 1 ?
            <>

              <Table columns={columns} dataSource={data} pagination={pagination} bordered scroll={{ x: 2000, y: 500 }} /></>
            : this.props.type === 2 ? <>
              <Table columns={columns} dataSource={data} pagination={pagination} bordered backgroundColor="#bab2b2" scroll={{ x: 2500, y: 500 }} /></>
              : <>
                <Table columns={columns} dataSource={data} pagination={pagination} bordered backgroundColor="#bab2b2" scroll={{ x: 1300, y: 500 }} /></>

        }

      </>
    )
  }
}

// columns.push({
//   title: this.props.keys[i],
//   dataIndex: this.props.keys[i],
//   key: this.props.keys[i],
//   width: 'auto',
//   ...this.getColumnSearchProps(this.props.keys[i]),
//   sorter: (a, b) => a.address.length - b.address.length,
//   sortDirections: ['descend', 'ascend'],
// })