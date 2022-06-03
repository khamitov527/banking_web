import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"


export default function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [filterInputValue, setFilterInputValue] = useState("")
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])

  const handleOnInputChange = (event) => {
    setFilterInputValue(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      try {
        const transactionsData = await axios.get("http://localhost:3001/bank/transactions")
        if (transactionsData?.data?.transactions) {
          setTransactions(transactionsData.data.transactions)
        }
        const transfersData = await axios.get("http://localhost:3001/bank/transfers")
        if (transfersData?.data?.transfers) {
          setTransfers(transfersData.data.transfers)
        }
      } catch (err) {
        console.log({err})
        setError(err)
      }
      setIsFetching(false)
    }

    fetchData()
  }, [])

  const addTransaction = (newTransaction) => {
    setTransactions((transactions) => [...transactions, newTransaction])
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} handleOnInputChange={handleOnInputChange}/>
        <Routes>
          <Route path="/" element={ 
            <Home 
              transfers={transfers}
              transactions={transactions}
              isLoading={isFetching}
              error={error}
              filterInputValue={filterInputValue}
              addTransaction={addTransaction}
            /> 
          }/>
          <Route 
            path="/bank/transactions/:transactionId" element={ <TransactionDetail /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
