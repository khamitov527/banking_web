import "./AddTransaction.css"
import { useCallback, useState } from "react"
import axios from "axios"

export default function AddTransaction({addTransaction}) {

  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    description: "",
    category: "",
    amount: ""
  })

  const handleOnChange = (event) => {
    setForm((f) => ({...f, [event.target.name]: [event.target.value]}))
  }

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    try {
      const res = await axios.get.post(`http://localhost:3001/bank/transactions/`, {transaction: form})
      if(res?.data?.transaction){
        addTransaction(res.data.transaction)
      }
      setForm({
        description: "",
        category: "",
        amount: "" 
      })
    } catch (err) {
      setError(err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>

      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input type="text" name="description" placeholder="Enter a description..." onChange={handleOnChange}/>
          </div>
          <div className="field">
            <label>Category</label>
            <input type="text" name="category" placeholder="Enter a category..." onChange={handleOnChange}/>
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label>Amount (cents)</label>
            <input type="number" name="amount" onChange={handleOnChange}/>
          </div>

          <button className="btn add-transaction" type="submit" onClick={() => handleOnSubmit()}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
