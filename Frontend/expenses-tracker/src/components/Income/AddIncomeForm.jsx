import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup'

const AddIncomeForm = ({onAddIncome}) => {

    const [income,setIncome]=useState({
        source:'',
        amount:'',
        date:'',
        icon: '',
    })
    const handleChange = (key,value )=> setIncome({...income, [key]:value})
  return (
    <div>
         <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon)=> handleChange('icon',selectedIcon)}
        />
        <Input
        value={income.source}
        onChange={({target})=> handleChange('source', target.value)}
        label='Income Source'
        placeholder='Frelance, salary'
        type='text'
        />
        <Input
        value={income.amount}
        onChange={({target})=> handleChange('amount',target.value)}
        label='Amount'
        placeholder=""
        type='number'
        />
        <Input
        value={income.date}
        onChange={({target})=> handleChange('date',target.value)}
        label='Date'
        placeholder=''
        type='date'
        />
        <div className='flex justify-end mt-6'>
            <button
            type='button'
            className='add-btn add-btn-fill'
            onClick={()=>onAddIncome(income)}
            >Add Income</button>
        </div> 
    </div>
  )
}

export default AddIncomeForm

// import React, { useState } from 'react';
// import Input from '../Inputs/Input';
// import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

// const AddIncomeForm = ({ onAddIncome }) => {
//     const [income, setIncome] = useState({
//         source: '',
//         amount: '',
//         date: '',
//         icon: '',
//     });

//     const handleChange = (key, value) => setIncome({...income, [key]: value});

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!income.source || !income.amount || !income.date) {
//             alert('Please fill all required fields');
//             return;
//         }
//         onAddIncome(income);
//         setIncome({
//             source: '',
//             amount: '',
//             date: '',
//             icon: '',
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <EmojiPickerPopup
//                 icon={income.icon}
//                 onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
//             />
//             <Input
//                 value={income.source}
//                 onChange={({ target }) => handleChange('source', target.value)}
//                 label='Income Source'
//                 placeholder='Freelance, salary'
//                 type='text'
//                 required
//             />
//             <Input
//                 value={income.amount}
//                 onChange={({ target }) => handleChange('amount', target.value)}
//                 label='Amount'
//                 placeholder=""
//                 type='number'
//                 required
//             />
//             <Input
//                 value={income.date}
//                 onChange={({ target }) => handleChange('date', target.value)}
//                 label='Date'
//                 type='date'
//                 required
//             />
//             <div className='flex justify-end mt-6'>
//                 <button
//                     type='submit'
//                     className='add-btn add-btn-fill bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors'
//                 >
//                     Add Income
//                 </button>
//             </div> 
//         </form>
//     );
// };

// export default AddIncomeForm;

// // import React, { useState } from 'react';
// // import Input from '../Inputs/Input';
// // import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

// // const AddIncomeForm = ({ onAddIncome }) => {
// //     const [income, setIncome] = useState({
// //         source: '',
// //         amount: '',
// //         date: '',
// //         icon: '',
// //     });

// //     const handleChange = (key, value) => {
// //         console.log(`Setting ${key} to:`, value);
// //         setIncome({...income, [key]: value});
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         console.log('Submitting income:', income);
// //         if (!income.source || !income.amount || !income.date) {
// //             alert('Please fill all required fields');
// //             return;
// //         }
// //         onAddIncome(income);
// //         setIncome({
// //             source: '',
// //             amount: '',
// //             date: '',
// //             icon: '',
// //         });
// //     };

// //     return (
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //             <EmojiPickerPopup
// //                 icon={income.icon}
// //                 onSelect={(selectedIcon) => {
// //                     console.log('Selected icon in parent:', selectedIcon);
// //                     handleChange('icon', selectedIcon);
// //                 }}
// //             />
// //             {/* Rest of your form inputs */}
// //         </form>
// //     );
// // };

// // export default AddIncomeForm;
