// import React from 'react'
// import { XAxis, YAxis, Tooltip, ResponsiveContainer,  Area, AreaChart, CartesianGrid } from 'recharts'

// const CustomLineChart = ({ data }) => {
//     const CustomTooltip = ({ active, payload }) => {
//         if (active && payload && payload.length) {
//             return (
//                 <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
//                     <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.category}</p>
//                     <p className='text-sm text-gray-600'>
//                         Amount:<span className='text-sm font-medium text-gray-900'>${payload[0].payload.amount}
//                         </span>
//                     </p>
//                 </div>
//             )
//         }
//         return null;
//     }
//     return (
//         <div className='bg-white'>
//             <ResponsiveContainer width='100%' height={300}>
//                 <AreaChart data={data}>
//                 <defs>
//                     <linearGradient id='incomeGradient' x1='0' y1='0' x2='0' y2='1'>
//                         <stop offset='5%' stopColor='#875cf5' stopOpacity={0.4} />
//                         <stop offset='95%' stopColor='#875cf5' stopOpacity={0} />
//                     </linearGradient>
//                 </defs>
//                 <CartesianGrid stroke="none"/>
//                {/* < CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" /> */}
//                 <XAxis dataKey='month' tick={{fontSize:12, fill:'#555'}} stroke='none' />
//                 <YAxis  tick={{fontSize:12, fill:'#555'}} stroke='none' />
//                 <Tooltip content={<CustomTooltip />} />

//                 <Area type='monotone' datakey='amount' stroke='#875cf5' fill='url(#incomeGradient)'strokeWidth={3} dot={{r:3,fill:"#ab8df8"}} />
//                 </AreaChart>
//             </ResponsiveContainer>
//         </div>
//     )
// }

// export default CustomLineChart


import React from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid } from 'recharts'

const CustomLineChart = ({ data }) => {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.category}</p>
                    <p className='text-sm text-gray-600'>
                        Amount:<span className='text-sm font-medium text-gray-900'>${payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }
        return null;
    }
//     // Add this above your component
// const formatXAxisDate = (dateStr) => {
//     // If your dates are already in "15th Apr" format, just return them
//     if (typeof dateStr === 'string' && dateStr.match(/\d+(st|nd|rd|th) [A-Za-z]{3}/)) {
//       return dateStr;
//     }
    
//     // If you have Date objects or ISO strings, format them
//     if (dateStr instanceof Date || Date.parse(dateStr)) {
//       const date = new Date(dateStr);
//       const day = date.getDate();
//       const suffix = ['th', 'st', 'nd', 'rd'][
//         (day % 20 > 3) ? 0 : (day % 20)
//       ];
//       const month = date.toLocaleString('default', { month: 'short' });
//       return `${day}${suffix} ${month}`;
//     }
    
//     return dateStr; // fallback
//   };
    
    return (
        <div className='bg-white'>
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id='incomeGradient' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor='#875cf5' stopOpacity={0.8} />
                            <stop offset='100%' stopColor='#875cf5' stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis 
                        dataKey='month' 
                        tick={{ fontSize: 12, fill: '#555' ,fontWeight: 'bold'}} 
                        // tickFormatter={formatXAxisDate}
                        axisLine={false}
                        tickLine={false}
                        stroke="#ccc"
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: '#555' }} 
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type='monotone' 
                        dataKey='amount' 
                        stroke='#875cf5' 
                        fill='url(#incomeGradient)'
                        strokeWidth={3} 
                        dot={{ r: 4, fill: "#875cf5", strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, fill: "#875cf5", strokeWidth: 2, stroke: '#fff' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomLineChart
