import { BsFillTrashFill, BsPencilSquare, BsCheckCircle, BsXCircle, BsFillGrid3X3GapFill, BsCheckAll, BsX } from "react-icons/bs"
import { Modal } from "react-bootstrap";
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
    this.state = {
      show: false,
      searchText: '',
      searchedColumn: '',
      setShow: '',
      list: [],
      tc: '',
      tl: '',
      redirect: null
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

  panReject(record) {
    console.log(record, "reject")
    let data = { lead_id: record.ID, code:0 }
    if (window.confirm("Reject PAN for " + record.NAME + "?")) {

      axios.post(`${baseUrl}/api/bm-pan-sbi`, data)
        .then(res => res.json())
        .then(res => {
          console.log(res)

        })
        .catch(err => {
          console.warn(err.msg)
        });
      // this.setState({});
      window.location.reload(false)
    } else {
      return false;
    }
  }
  onCloseModal = () => {
    this.setState({ show: false })
  }
  panAccept = (record) => {

    // this.setState({ tc: record.USER_ID })
    console.log(record, "accept")
    let data = { lead_id: record.ID, code:1 }
    if (window.confirm("Confirm PAN for " + record.NAME + "?")) {

      axios.post(`${baseUrl}/api/bm-pan-sbi`, data)
        .then(res => res.json())
        .then(res => {
          console.log(res)

        })
        .catch(err => {
          console.warn(err.msg)
        });
      // this.setState({});
      window.location.reload(false)
    } else {
      return false;
    }
  };

 


  render() {

    const columns = [];
    // this.props.keys.push("ACTION")
    for (var i = 0; i < this.props.keys.length; i++) {
      var id = i
      if (this.props.keys[i] === 'STATUS' && this.props.type === 1) {
        columns.push({
          title: this.props.keys[i],
          dataIndex: this.props.keys[i],
          key: this.props.keys[i],
          width: 'auto',
          fixed: 'right',
          ...this.getColumnSearchProps(this.props.keys[i]),
          render: text => <>
          {
            text == "App Code Pending" ?
            <>
            <p style={{ fontWeight:"bold", color:"#ffca00"}}>{text}</p>
            </>:text == "Pending for verification" ?
            <>
            <p style={{ fontWeight:"bold", color:"#ff6b00"}}>{text}</p>
            </>:text == "Need Correction" ?
            <>
            <p style={{ fontWeight:"bold", color:"crimson"}}>{text}</p>
            </>:text == "App Code Received" ?
            <>
            <p style={{ fontWeight:"bold", color:"blue"}}>{text}</p>
            </>:text == "Approve" ?
            <>
            <p style={{ fontWeight:"bold", color:"green"}}>{text}</p>
            </>:text == "Decline" ?
            <>
            <p style={{ fontWeight:"bold", color:"red"}}>{text}</p>
            </>:text == "Card Booked" ?
            <>
            <p style={{ fontWeight:"bold", color:"darkgreen"}}>{text}</p>
            </>:
            <></>
          }
          </>,
        })
      }else if(this.props.keys[i] === 'STATUS'  && this.props.type === 2){
        columns.push({
          title: 'STATUS',
          dataIndex: 'STATUS',
          render: text => <>
          {
            text == "App Code Pending" ?
            <>
            <p style={{ fontWeight:"bold",color:"#ffca00"}}>{text}</p>
            </>:text == "Pending for verification" ?
            <>
            <p style={{ fontWeight:"bold",color:"#ff6b00"}}>{text}</p>
            </>:text == "QD" ?
            <>
            <p style={{ fontWeight:"bold",color:"#ff6b00"}}>{text}</p>
            </>:text == "Need Correction" ?
            <>
            <p style={{ fontWeight:"bold",color:"crimson"}}>{text}</p>
            </>:text == "App Code Received" ?
            <>
            <p style={{ fontWeight:"bold",color:"blue"}}>{text}</p>
            </>:text == "Approve" ?
            <>
            <p style={{ fontWeight:"bold",color:"green"}}>{text}</p>
            </>:text == "Decline" ?
            <>
            <p style={{ fontWeight:"bold",color:"red"}}>{text}</p>
            </>:text == "Card Booked" ?
            <>
            <p style={{ fontWeight:"bold",color:"darkgreen"}}>{text}</p>
            </>:
            <></>
          }
          </>,
        })
      }else if(this.props.keys[i] === 'STATUS'  && this.props.type === 3){
        columns.push({
          title: 'STATUS',
          dataIndex: 'STATUS',
          render: text => <>
          {
            text == "OK" ?
            <>
            <p style={{ fontWeight:"bold",color:"green"}}>{text}</p>
            </>:text == "NOK" ?
            <>
            <p style={{ fontWeight:"bold",color:"red"}}>{text}</p>
            </>:
            <></>
          }
          </>,
        })
      }else if(this.props.keys[i] === 'TL_STATUS'  && this.props.type === 2){
        columns.push({
          title: 'TL_STATUS',
          dataIndex: 'TL_STATUS',
          render: text => <>
          {
            text == "Approve" ?
            <>
            <p style={{ fontWeight:"bold",color:"green"}}>{text}</p>
            </>:text == "Reject" ?
            <>
            <p style={{ fontWeight:"bold",color:"red"}}>{text}</p>
            </>:text == "App Code Sent" ?
            <>
            <p style={{ fontWeight:"bold",color:"darkmagenta"}}>{text}</p>
            </>:text == "Doc. Sent" ?
            <>
            <p style={{ fontWeight:"bold",color:"darkolivegreen"}}>{text}</p>
            </>:
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

          {/* {
            this.user.role === 1 ?
              <> */}
          {
            this.props.type === 3  ?
              <>
              {
                this.user.role === 1 || this.user.role === 4 ? 
                <>
                <span>  </span><button onClick={(e) => this.panAccept(record)}><BsCheckCircle /></button>
                <span>   </span><button onClick={() => this.panReject(record)}><BsXCircle /></button>
                { this.props.bank === 'SBI' && record.STATUS === 'OK'? <>
                    <span>  </span>
                  <Link to={`/edit-sbi-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                  </> : this.props.bank === 'SCB' && record.STATUS === 'OK'? 
                  <>
                  <span>  </span>
                  <Link to={`/edit-scb-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                  </>:<></>}
                </>:this.user.role === 3 || this.user.role === 4 || this.user.role === 2? 
                <>
                { this.props.bank === 'SBI' && record.STATUS === 'OK'? <>
                    <span>  </span>
                  <Link to={`/edit-sbi-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                  </> : this.props.bank === 'SCB' && record.STATUS === 'OK'? 
                  <>
                  <span>  </span>
                  <Link to={`/edit-scb-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                  </>:<></>}
                </>:<></>
              }
              </>
              :
              this.props.type === 2 ?
                <>
                  
                  {this.props.bank === 'SBI' ? <>
                    <span>  </span>
                  <Link to={`/edit-sbi-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                  </> : this.props.bank === 'SCB'? 
                  <>
                  <span>  </span>
                  <Link to={`/edit-scb-entry/${record.ID}`}><button data-tip data-for="registerTip"><BsPencilSquare /></button></Link>
                  </>:<></>}
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
    return (
      <>

        {
          this.props.type === 1 ?
            <><Table columns={columns} dataSource={this.props.data} bordered scroll={{ x: 1700, y: 500 }} /></>
            :this.props.type === 2 ? <>
            <Table columns={columns} dataSource={this.props.data} bordered backgroundColor="#bab2b2" scroll={{ x: 2500, y: 500 }} /></>
            :<>
            <Table columns={columns} dataSource={this.props.data} bordered backgroundColor="#bab2b2" scroll={{ x: 1300, y: 500 }} /></>
            
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