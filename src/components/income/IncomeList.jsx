import React from 'react'
import {LuDownload} from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment from 'moment'

function IncomeList({transactions, onDelete, onDownload}) {
  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg'>Income Sources</h5>
        <button className='card-btn' onClick={onDownload}>
            <LuDownload className='text-base'/> Download
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2.5'>
        {transactions?.length === 0 ? (
            <p className='text-gray-500 text-center col-span-full'>No income source available</p>
        ) : (transactions?.map((income)=>(
                <TransactionInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                amount={income.amount}
                date={moment(income.date).format("Do MMM YYYY")}
                type="income"
                onDelete={()=> onDelete(income._id)}
                />
            )))}
      </div>
    </div>
  )
}

export default IncomeList
