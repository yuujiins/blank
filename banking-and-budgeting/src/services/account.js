import {toast} from "react-toastify";

const server = 'http://localhost:5000/'
const postHeader = {
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}

export const register = async (data) => {
    const existingUser = await fetch(server + 'users/email', {
        method: 'POST',
        headers: postHeader,
        body: JSON.stringify(data)
    })
    const ear = await existingUser.json()
    if(ear !== null){
        return {
            status: 10,
            message: 'Email already registered'
        }
    }
    const ajaxResult = await fetch(server + 'users',{
        method: 'POST',
        headers: postHeader,
        body: JSON.stringify(data)
    })
    const r = await ajaxResult.json()
    if(r.status === 1){
        const addAcctAjaxResult = await fetch(server + `account/${r.user._id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'x-access-token' : r.token
            },
            body: JSON.stringify({})
        })
        const ar = await addAcctAjaxResult.json()
        if(ar.status == 1) {
            console.log('Sending OTP')
            const message = `Welcome to Blank! Your OTP is ${r.otp}. Use this to verify your account.`
            const m = await fetch(`http://gateway.onewaysms.ph:10001/api.aspx?apiusername=APIEOB6R6R8MO&apipassword=APIEOB6R6R8MOKATYZ&senderid=INFO&mobileno=${data.mobileNumber}&message=${message}`, {
                method: 'GET',
                mode: "no-cors"
            })

            if (m !== null) {
                return {
                    status: 1,
                    userId: r.user._id,
                    message: 'Please check your mobile inbox for your OTP'
                }
            }
        }
    }
}

export const login = async (data) => {
    const ajaxResult = await fetch(server + 'login', {
        method: 'POST',
        headers: postHeader,
        body: JSON.stringify(data)
    })
    const r = await ajaxResult.json()

    if(r !== null && r.status === 1){
        const accountAjax = await fetch(server + `account/${r._id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : r.token
            }
        })
        const ar = await accountAjax.json()
        if(ar !== null){
            r.accountData = ar;
        }
        return r;
    }
    else{
        return r;
    }
}

export const verifyOTP = async (data) => {
    const ajaxResult = await fetch(server + 'verify', {
        method: 'POST',
        headers: postHeader,
        body: JSON.stringify(data)
    })
    const r = await ajaxResult.json()
    return r;
}

export const checkOTP = async (data) => {
    const ajaxResult = await fetch(server + 'checkOTP', {
        method: 'POST',
        headers: postHeader,
        body: JSON.stringify(data)
    })
    const r = await ajaxResult.json()
    if(r.status === 2){
        console.log('Sending OTP')
        const message = `Welcome to Blank! Your OTP is ${r.otp}. Use this to verify your account.`
        const m = await fetch(`http://gateway.onewaysms.ph:10001/api.aspx?apiusername=APIEOB6R6R8MO&apipassword=APIEOB6R6R8MOKATYZ&senderid=INFO&mobileno=${data.mobileNumber}&message=${message}`,{
            method: 'GET',
            mode: "no-cors"
        })

        if(m !== null){
            return {
                status: 1,
                message: 'Please check your mobile inbox for your OTP'
            }
        }
    }
    else{
        console.log('Sending Existing OTP')
        const message = `Welcome to Blank! Your OTP is ${r.otp}. Use this to verify your account.`
        const m = await fetch(`http://gateway.onewaysms.ph:10001/api.aspx?apiusername=APIEOB6R6R8MO&apipassword=APIEOB6R6R8MOKATYZ&senderid=INFO&mobileno=${data.mobileNumber}&message=${message}`,{
            method: 'GET',
            mode: "no-cors"
        })
        return {
            status: 0
        }
    }
}

export const send = async (data) => {
    const recipientUser = await fetch(server + 'users/email', {
        method: 'POST',
        headers: postHeader,
        body: JSON.stringify(data)
    })
    const rar = await recipientUser.json()
    console.log(data)
    if(rar !== null){
        const ajaxResult = await fetch(server + `account/${rar._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
        const r = await ajaxResult.json()
        if(r !== null){
            const d = new Date()
            const senderUpdate = await fetch(server + `account/${window.sessionStorage.getItem('userId')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'x-access-token' : window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    funds: parseFloat(window.sessionStorage.getItem('funds')) - parseFloat(data.amount)
                })
            })
            const recipientUpdate = await fetch(server + `account/${rar._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'x-access-token' : window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    funds: parseFloat(rar.userAccount.funds) + parseFloat(data.amount)
                })
            })
            const trAjax = await fetch(server + `account/${window.sessionStorage.getItem('userId')}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'x-access-token' : window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    userId: window.sessionStorage.getItem('userId'),
                    type: 'transfer',
                    recipientEmail: rar.email,
                    date: d.toLocaleDateString(),
                    time: d.toTimeString(),
                    amount: data.amount,
                    runningBalance: parseFloat(window.sessionStorage.getItem('funds')) - parseFloat(data.amount)
                })
            })
            const trar = await trAjax.json()
            if(trar.status === 1){
                const trAjax = await fetch(server + `account/${rar._id}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json',
                        'x-access-token' : window.sessionStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        userId: window.sessionStorage.getItem('userId'),
                        type: 'receive',
                        senderEmail: window.sessionStorage.getItem('email'),
                        date: d.toLocaleDateString(),
                        time: d.toTimeString(),
                        amount: data.amount,
                        runningBalance: parseFloat(rar.userAccount.funds) + parseFloat(data.amount)
                    })
                })
                const trar = await trAjax.json()
            }
            window.sessionStorage.setItem('funds', (parseFloat(window.sessionStorage.getItem('funds')) - parseFloat(data.amount)).toString())
            return {
                status: 1,
                message: 'Funds sent successfully'
            };
        }
    }
    else{
        return {
            status: -10,
            message: 'Recipient email is not registered'
        }
    }
}

export const deposit = async (data) => {
    const ajaxResult = await fetch(server + `account/${window.sessionStorage.getItem('userId')}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'x-access-token' : window.sessionStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
    const r = await ajaxResult.json();
    if(r !== null){
        const d = new Date()
        const trAjax = await fetch(server + `account/${window.sessionStorage.getItem('userId')}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'x-access-token' : window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                userId: window.sessionStorage.getItem('userId'),
                type: data.type,
                date: d.toLocaleDateString(),
                time: d.toTimeString(),
                amount: data.amount,
                runningBalance: data.funds
            })
        })
        const tar = await trAjax.json()
        if(tar.status === 1){
            console.log(r)

        }
    }
    return r;
}

export const getTransactions = async () => {
    const ajaxResult = await fetch(server + `account/${window.sessionStorage.getItem('userId')}/transactions`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'x-access-token' : window.sessionStorage.getItem('token')
        }
    })
    return ajaxResult;
}

export const getTransactionsFiltered = async (data) => {
    const ajaxResult = await fetch(server + `account/${window.sessionStorage.getItem('userId')}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'x-access-token' : window.sessionStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
    return ajaxResult;
}