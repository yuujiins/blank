import {Button, Card, Col, Figure, Form, Row} from "react-bootstrap";
import UserCard from "../components/user-card";
import {useEffect, useState} from "react";
import VirtualCard from "../components/virtual-card";
import FundInfo from "../components/fund-info";
import TransactionTable from "../components/transaction-table";
import DwModal from "../components/dw-modal";
import ExpensesTable from "../components/expenses-table";
import {useNavigate} from "react-router-dom";
import {deposit, getTransactions, send} from "../services/account";
import {toast} from "react-toastify";
import {parse} from "@fortawesome/fontawesome-svg-core";
const Dashboard = (props) => {
    const navigate = useNavigate();
    const [dtData, setDtData] = useState([]);
    const [edtDAta, setEdtData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [tableView, setTableView] = useState(props.tableView)
    const tColumns = [
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Time',
            selector: row => row.time,
            sortable: true
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true
        },
        {
            name: 'Running Balance',
            selector: row => row.runningBalance,
            sortable: false
        }
    ];
    const eColumns = [
        {
            name: 'Date',
            selector: row=>row.date,
            sortable: true
        },
        {
            name: 'Expense amount',
            selector: row=>row.amount,
            sortable: true
        }
    ]
    const tData = [

    ]
    const eData = []
    const handleModalClose = () => {setModalShow(false)};
    const handleModalShow = () => {setModalShow(true)};
    const onDepositClick = () => {
        setModalMode("deposit")
        setModalShow(true)
    }
    const onWithdrawClick = () => {
        setModalMode("withdraw")
        setModalShow(true)
    }
    const onSendClick = () => {
        setModalMode("send")
        setModalShow(true)
    }

    const handleTransactionSearch = (e) =>{
        e.preventDefault()
        const data = {
            dateFrom: document.querySelector('#dtDateFrom').value,
            dateTo: document.querySelector('#dtDateTo').value
        }
    }

    const handleExpensesSearch = (e) => {
        e.preventDefault();
        setEdtData(eData);
    }

    const onSubmitDwForm = async (e) => {
        e.preventDefault();
        const fund = (modalMode === 'deposit' ? parseFloat(window.sessionStorage.getItem('funds')) + parseFloat(document.querySelector('#dwAmount').value)
                                                : parseFloat(window.sessionStorage.getItem('funds')) - parseFloat(document.querySelector('#dwAmount').value))
        const data = {
            userId: window.sessionStorage.getItem('userId'),
            funds: fund,
            amount: parseFloat(document.querySelector('#dwAmount').value),
            type: modalMode
        }
        if(modalMode === 'withdraw' && (window.sessionStorage.getItem('funds')) < parseFloat(document.querySelector('#dwAmount').value)){
            toast.error('Insufficient funds!', {
                position: 'top-center',
                autoClose: '3000',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light'
            })
        }
        else{
            const result = await deposit(data);
            console.log(result)
            if(result.status === 1){
                window.sessionStorage.setItem('funds', fund.toString());
                toast.success((modalMode === 'deposit' ? 'Deposit' : 'Withdraw') + ' success!', {
                    position: 'top-center',
                    autoClose: '3000',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light'
                })
            }
            else{
                toast.error('Operation failed!', {
                    position: 'top-center',
                    autoClose: '3000',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light'
                })
            }
            setModalShow(false)
        }
    }
    const onSubmitSendForm = async (e) => {
        e.preventDefault();
        const availableFunds = parseFloat(window.sessionStorage.getItem('funds'))
        if(availableFunds < parseFloat(document.querySelector('#sendAmount').value)){
            toast.error('Insufficient funds!', {
                position: 'top-center',
                autoClose: '3000',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light'
            })
        }
        else{
            const data = {
                email: document.querySelector('#sendRecipientEmail').value,
                amount: document.querySelector('#sendAmount').value
            }
            const ajaxResult = await send(data)
            const ajr = await ajaxResult
            console.log(ajr)
            if(ajr.status === 1){
                toast.success('Money sent successfully', {
                    position: 'top-center',
                    autoClose: '3000',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light'
                })
                setModalShow(false)
            }
            else{
                toast.error('Recipient email does not exist!', {
                    position: 'top-center',
                    autoClose: '3000',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light'
                })
            }
        }
    }
    useEffect(() => {
        document.title = "Blank - Dashboard"
        if(window.sessionStorage.getItem('token') === null){
            navigate('/login', {
                replace: false
            })
        }
        if(props.tableView === 'expenses'){
            setTableView('expenses')
        }
        else{
            setTableView('transactions')
        }
        getTransactions()
            .then(result => result.json())
            .then(data => {
                setDtData(data)
            })
    }, [])
    return (
      <Row style={{padding: "50px", margin: 0}}>
          <DwModal show={modalShow} handleClose={handleModalClose} mode={modalMode} dwSubmit={onSubmitDwForm} sendFormSubmit={onSubmitSendForm}/>
          <h1>Your Dashboard</h1>
          <Row>
              <Col md={3}>
                <UserCard/>
              </Col>
              <Col>
                  <Row>
                      <Col md={4}>
                          <VirtualCard/>
                      </Col>
                      <Col>
                          <FundInfo onDepositClick={onDepositClick} onWithdrawClick={onWithdrawClick} onSendClick={onSendClick}/>
                      </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                        {tableView === 'expenses' ? <ExpensesTable onSearch={handleExpensesSearch} data={eData} columns={eColumns}/> : <TransactionTable onSearch={handleTransactionSearch} data={dtData} columns={tColumns}/>}
                    </Col>
                  </Row>
              </Col>
          </Row>
      </Row>
    );
}

export default Dashboard;