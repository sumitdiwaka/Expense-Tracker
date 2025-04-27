import React, { useEffect, useState } from 'react'
import { prepareExpenseLinechartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Cards/CustomLineChart';

const ExpenseOverview = ({transactions,onExpenseIncome}) => {
    const[chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseLinechartData(transactions);
        setChartData(result);

        return ()=>{};
    },[transactions])
  return (
    <div className='card'>
        <div className='flex items-center  justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5 '>
                    Track Your spending trends over time and gain insights into when
                    your money goes.
                                                                          
                </p>
            </div>
            <button className='add-btn' onClick={onExpenseIncome}>
                <LuPlus className='text-lgh' />
                Add Expense
            </button>
        </div>
        <div className='mt-10'>
            <CustomLineChart data={chartData} />
        </div>
    
    </div>
  )
}

export default ExpenseOverview
