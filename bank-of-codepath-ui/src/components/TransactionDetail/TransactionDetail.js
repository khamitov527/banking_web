import { formatAmount, formatDate } from "../../utils/format"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./TransactionDetail.css"
import axios from "axios"

export default function TransactionDetail() {
  const transactionId = useParams() 
  const [transaction, setTransaction] = useState({}) 
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchTransactionById = async () => {
      setIsLoading(true)
      try {
        const transactionData = await axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
        if(transactionData?.data?.transaction){
          setTransaction(transactionData.data.transaction)
        } else {
          setError("Transaction not found.")
        }
      } catch (err) {
        console.log({err})
        setError("Transcaction not found.")
      }
      setIsLoading(false)
    }
    fetchTransactionById()

  }, [transactionId])

  const renderTransactionContent = () => {
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <p className="description">No transaction found</p>

    return (
      <>
        <p className="description">{transaction?.description}</p>
        <div className="meta">
          <p className={`amount ${transaction?.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction?.amount)}</p>
          <p className="date">{formatDate(transaction?.postedAt)}</p>
        </div>
      </>
    )
  }

  return (
    <div className="TransactionDetail">
      <div className="card">
        <div className="title">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction?.category}</p>
        </div>

        {renderTransactionContent()}
      </div>
    </div>
  )
}
