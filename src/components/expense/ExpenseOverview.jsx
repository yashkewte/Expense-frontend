import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from '../cards/CustomLineChart'

function ExpenseOverview({transactions, onExpenseIncome}) {
    
    const [chartData, setChartData] = useState([])
    

    useEffect(()=>{
        const result = prepareExpenseLineChartData(transactions)
        setChartData(result)

    },[])
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg'>Expense Overview</h5>
          <p className='text-xs text-gray-500'>
            Trach your spending trends over time and gain insights into where your money goes.
          </p>
        </div>
        <button
         className='add-btn add-btn-fill'
         onClick={onExpenseIncome}
        >
          <LuPlus className='text-lg'/> Add Expense
        </button>
      </div>
      <div className='mt-10'>
        <CustomLineChart data={chartData}/>
      </div>
    </div>
  )
}

export default ExpenseOverview
