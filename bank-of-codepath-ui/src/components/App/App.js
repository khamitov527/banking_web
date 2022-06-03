import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"

export default function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [filterInputValue, setFilterInputValue] = useState("")
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])

  useEffect(() => {
    setIsFetching(true)
    const fetchData = async () => {
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

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route 
            path="/transactions/:transactionId" element={ <TransactionDetail /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
