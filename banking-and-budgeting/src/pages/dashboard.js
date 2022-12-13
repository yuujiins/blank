import {Button, Card, Col, Figure, Form, Row} from "react-bootstrap";
import UserCard from "../components/user-card";
import {useEffect, useState} from "react";
import VirtualCard from "../components/virtual-card";
import FundInfo from "../components/fund-info";
import TransactionTable from "../components/transaction-table";
import DwModal from "../components/dw-modal";
import ExpensesTable from "../components/expenses-table";
import {useNavigate} from "react-router-dom";
import {
    addExpense,
    deposit, getAccountInfo,
    getExpenses,
    getExpensesFiltered,
    getTransactions,
    getTransactionsFiltered,
    send
} from "../services/account";
import {toast} from "react-toastify";
import {parse} from "@fortawesome/fontawesome-svg-core";
import AddExpenseModal from "../components/add-expense-modal";
const Dashboard = (props) => {
    const navigate = useNavigate();
    const [dtData, setDtData] = useState([]);
    const [edtDAta, setEdtData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [tableView, setTableView] = useState(props.tableView)
    const [expenseModalShow, setExpenseModalShow] = useState(false)
    const [currentBalance, setCurrentBalance] = useState(window.sessionStorage.getItem('funds'))
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
            name: 'Description',
            selector: row=>row.description,
            sortable: false
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
            name: 'Description',
            selector: row => row.description,
            sortable: false
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
    const onExpenseModalShow = () => {
        setExpenseModalShow(true)
    }
    const handleExpenseModalClose = () => {
        setExpenseModalShow(false)
    }
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

    const handleTransactionSearch = async (e) =>{
        e.preventDefault()
        const data = {
            dateFrom: document.querySelector('#dtDateFrom').value,
            dateTo: document.querySelector('#dtDateTo').value
        }
        getTransactionsFiltered(data)
            .then(response => response.json())
            .then(data => {
                data.forEach((d) => {
                    d.date = new Date(d.date).toLocaleDateString()
                    d.amount = (Math.round(d.amount * 100) / 100).toFixed(2)
                    d.runningBalance = (Math.round(d.runningBalance * 100) / 100).toFixed(2)
                })
                setDtData(data)
            });

    }

    const getAllTransactions = () => {
        getTransactions()
            .then(response => response.json())
            .then(data => {
                data.forEach((d) => {
                    d.date = new Date(d.date).toLocaleDateString()
                    d.amount = (Math.round(d.amount * 100) / 100).toFixed(2)
                    d.runningBalance = (Math.round(d.runningBalance * 100) / 100).toFixed(2)
                })
                setDtData(data)
            })
    }

    const getAllExpenses = () => {
        getExpenses()
            .then(response => response.json())
            .then(data => {
                data.forEach((d) => {
                    d.date = new Date(d.date).toLocaleDateString()
                })
                setEdtData(data)
            })
    }

    const getCurrentBalance = () => {
        getAccountInfo()
            .then(response => response.json())
            .then(data => {
                data.funds = (Math.round(data.funds * 100) / 100).toFixed(2)
                console.log((Math.round(data.funds * 100) / 100).toFixed(2).toString())
                setCurrentBalance(data.funds)
                window.sessionStorage.setItem('funds', data.funds.toString())
            })
    }

    const handleReloadBalance = () => {
        getCurrentBalance()
    }

    const resetTransactionSearch = (e) => {
        document.querySelector('#trSearchForm').reset()
        getAllTransactions()
    }

    const resetExpensesSearch = (e) => {
        document.querySelector('#expensesSearch').reset()
        getAllExpenses()
    }

    const handleExpensesSearch = (e) => {
        e.preventDefault();
        const data = {
            dateFrom:  document.querySelector('#edtDateFrom').value,
            dateTo: document.querySelector('#edtDateTo').value
        }
        getExpensesFiltered(data)
            .then(response => response.json())
            .then(data => {
                data.forEach((d) => {
                    d.date = new Date(d.date).toLocaleDateString()
                })
                setEdtData(data)
            })
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
        getCurrentBalance()
        getAllTransactions()
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
        getCurrentBalance()
        getAllTransactions()
    }
    const onSubmitAddExpenseForm = async (e) => {
        e.preventDefault()

        const data = {
            userId: window.sessionStorage.getItem('userId'),
            type: document.querySelector('#expenseType').value,
            description: document.querySelector('#expenseDescription').value,
            date: document.querySelector('#expenseDate').value,
            amount: document.querySelector('#expenseAmount').value
        }
        const expenseResult = await addExpense(data)
        console.log(expenseResult)
        if(expenseResult.status === 1){
            toast.success(expenseResult.message, {
                position: 'top-center',
                autoClose: '3000',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light'
            })
            //get all expenses and transactions
            getAllTransactions()
            getAllExpenses()
            getCurrentBalance()
            setExpenseModalShow(false)
        }
        else{
            toast.error(expenseResult.message, {
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
        getAllExpenses()
    }
    useEffect(() => {
        getAllTransactions()
        getAllExpenses()
        getCurrentBalance()
    }, [])

    useEffect( () => {
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
    })
    return (
      <Row style={{padding: "50px", margin: 0}}>
          <AddExpenseModal show={expenseModalShow} handleClose={handleExpenseModalClose} addExpenseSubmit={onSubmitAddExpenseForm}/>
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
                          <FundInfo tableView={props.tableView} toggleTableView={props.toggleTableView} reloadBalance={handleReloadBalance} currentBalance={currentBalance} onDepositClick={onDepositClick} onWithdrawClick={onWithdrawClick} onSendClick={onSendClick}/>
                      </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                        {tableView === 'expenses' ? <ExpensesTable onReset={resetExpensesSearch} onAddExpenseClick={onExpenseModalShow} onSearch={handleExpensesSearch} data={edtDAta} columns={eColumns}/> : <TransactionTable  onReset={resetTransactionSearch} onSearch={handleTransactionSearch} data={dtData} columns={tColumns}/>}
                    </Col>
                  </Row>
              </Col>
          </Row>
      </Row>
    );
}

export default Dashboard;