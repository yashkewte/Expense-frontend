import React, { useEffect, useState } from 'react'
import {prepareExpenseChartData} from '../../utils/helper'
import CustomBarChart from '../cards/CustomBarChart'

function Last30DaysExpenses({data}) {

    const [charData, setCharData] = useState([])

    useEffect(()=>{
        const result = prepareExpenseChartData(data)
        setCharData(result)
    },[data])
  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 Days Expenses</h5>
      </div>
      <CustomBarChart data={charData}/>
    </div>
  )
}

export default Last30DaysExpenses
