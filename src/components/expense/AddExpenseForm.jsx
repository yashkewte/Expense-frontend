import React, { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'


function AddExpenseForm({onAddExpense}) {
  const [expense, setExpense] = useState({
    category:'',
    amount: '',
    date:'',
    icon:''
  })

  const handleChange = (key, value) => setExpense({...expense, [key]:value})

  return (
    <div>
      <EmojiPickerPopup
         icon={expense.icon}
         onSelect={(selectedIcon)=> handleChange('icon', selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={(e)=> handleChange('category', e.target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc."
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={(e)=> handleChange('amount', e.target.value)}
        label="Amount"
        placeholder="₹"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={(e)=> handleChange('date', e.target.value)}
        label="Date"
        placeholder="YYYY-MM-DD"
        type="date"
      />

      <div className='flex justify-end'>
        <button
         type='button'
         className='add-btn add-btn-fill'
         onClick={()=> onAddExpense(expense)}
        >
            Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm
