import { BsFillTrashFill, BsPersonPlusFill, BsPeopleCircle, BsQuestionOctagonFill } from "react-icons/bs"
import { Modal } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import React from "react";
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import {  Link } from "react-router-dom";


import baseUrl from './baseurl';

export default class TableList extends React.Component {
  // state = {
  //   searchText: '',
  //   searchedColumn: '',
  // };
  constructor(props) {
    super(props);
    this.deleteMe = this.deleteMe.bind(this);
    this.addLeader = this.addLeader.bind(this);
    this.state = {
      show: false,
      searchText: '',
      searchedColumn: '',
      setShow: '',
      list: [],
      tc: '',
      tl: '',

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
  deleteMe(record) {
    // console.log(record.USER_ID)
    let data = { id: record.USER_ID }
    if (window.confirm("Delete user " + record.FIRST_NAME + "?")) {

      axios.post(`${baseUrl}/api/delete`, data)
        .then(res => res.json())
        .then(res => {
          // console.log(res)

        })
        .catch(err => {
          console.warn(err.msg)
        });
      window.location.reload(false)
    } else {
      return false;
    }
  }
  cancelLeave(record) {
    // console.log(record.USER_ID)
    let data = { leave_id: record.id }
    if (window.confirm("Sure Delete This Leave?")) {

      axios.post(`${baseUrl}/api/delete-leave`, data)
      .then(function (res) {
        console.log(res.data);
       
      })
      .catch(function (res) {
        console.log(res);
      });
      window.location.reload(false)
    } else {
      return false;
    }
  }
  onCloseModal = () => {
    this.setState({ show: false })
  }
  showModal = (record) => {

    this.setState({ tc: record.USER_ID })
    // console.log(this.state.tc)
    fetch(`${baseUrl}/api/get-tl-list-add`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        this.setState({ list: res })
      })
      .catch(err => {
        console.warn(err.msg)
      });
    this.setState({ show: true });
  };
  resetPassword = (record) => {
    let data = { reset_id: record.USER_ID }
    if (window.confirm("Reset Password of " + record.FIRST_NAME + "?")) {
      axios.get(`${baseUrl}/api/reset-password/${record.USER_ID}`)
        .then(res => res.json())
        .then(res => {

          console.log(res)
        })
        .catch(err => {
          console.warn(err.msg)
        });
      // window.location.reload(false)
    } else {
      return false;
    }
  }
  addLeader(e) {

    // console.log(this.state.tc, this.state.tl, this.user.user_id)

    let data = { tc: this.state.tc, tl: this.state.tl, bm: this.user.user_id }


    axios.post(`${baseUrl}/api/add-leader`, data)
      .then(res => res.json())
      .then(res => {
        console.log(res)

      })
      .catch(err => {
        console.warn(err.msg)
      });
    window.location.reload(false)

  }


  render() {
    const columns = [];
    // this.props.keys.push("ACTION")
    for (var i = 0; i < this.props.keys.length; i++) {
      var id = i
      columns.push({
        title: this.props.keys[i],
        dataIndex: this.props.keys[i],
        key: this.props.keys[i],
        width: 'auto',
        ...this.getColumnSearchProps(this.props.keys[i]),
      })

    }
    columns.push({
      title: 'Action', dataIndex: 'Action', width: 'auto', key: 'operation', render: (text, record) => <a>
        {
          this.user.role === 1 || this.user.role === 6 && this.props.type !== 5 ?
          <>
          <button data-tip data-for="registerTip" onClick={(e) => this.resetPassword(record)}><BsQuestionOctagonFill /></button>

              {
                this.props.type === 3 ?
                  <>
                    <span>  </span><button data-tip data-for="mapuser" onClick={(e) => this.showModal(record)}><BsPersonPlusFill /></button>
                  </>
                  :null
              }
              <span>   </span><button data-tip data-for="delete" onClick={() => this.deleteMe(record)}><BsFillTrashFill /></button>

            </>
            :this.user.role === 2 || this.user.role === 3 ?<>
              <span>   </span><button data-tip data-for="deleteLeave" onClick={() => this.cancelLeave(record)}><BsFillTrashFill /></button>
              <span> </span><Link to={`/view-leave-application/${record.id}`}><button data-tip data-for="viewLeave"><FaEye /></button></Link>

            </>:this.user.role === 1 || this.user.role === 6 && this.props.type === 5 ?<>
            <span> </span><Link to={`/view-leave-application/${record.id}`}><button data-tip data-for="viewLeave"><FaEye /></button></Link>
            
            </>:null
            
        }
        <ReactTooltip id="registerTip" place="top" effect="solid">Reset Password</ReactTooltip>
        <ReactTooltip id="mapuser" place="top" effect="solid">Assing Team Leader</ReactTooltip>
        <ReactTooltip id="delete" place="top" effect="solid">Delete User</ReactTooltip>
        <ReactTooltip id="deleteLeave" place="top" effect="solid">Delete User</ReactTooltip>
        <ReactTooltip id="viewLeave" place="top" effect="solid">Delete User</ReactTooltip>
      </a>,

    })
    let leaderList = this.state.list.length > 0
      && this.state.list.map((item, i) => {
        return (
          <option key={i} value={item.USER_ID}>{item.NAME}</option>
        )
      }, this);
    return (
      <>
        <Table columns={columns} dataSource={this.props.data} bordered scroll={{ x: "auto", y: 500 }}/>
        {/* <Modal show={this.state.show}>Message in Modal</Modal> */}
        <Modal show={this.state.show} onClose={this.onCloseModal}>
          <Modal.Header>
            <Modal.Title>Map Team Leader</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <ListTable cols={this.state.cols} val={this.state.list}/> */}
            <select id="inputState" className="form-control"
              value={this.state.tl}
              onChange={(e) => this.setState({ tl: e.target.value })}>
              <option >Select</option>
              {leaderList}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addLeader}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
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