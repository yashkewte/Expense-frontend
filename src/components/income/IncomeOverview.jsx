import React, { useEffect, useState } from 'react'
import {LuPlus} from 'react-icons/lu'
import CustomBarChart from '../cards/CustomBarChart'
import {prepareIncomeChartData} from '../../utils/helper'


function IncomeOverview({transactions, onAddIncome}) {
  const [charData, setCharData] = useState([])

  useEffect(()=>{
    const result = prepareIncomeChartData(transactions)
    setCharData(result)
  },[transactions])
  return (
    <div className='card'> 
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button className='add-btn' onClick={onAddIncome} aria-label='Add new income'>
          <LuPlus className='text-lg' />
          Add Income
        </button>

        
      </div>
      <div className='mt-10'>
          <CustomBarChart data={charData} />
        </div>
    </div>
  )
}

export default IncomeOverview
