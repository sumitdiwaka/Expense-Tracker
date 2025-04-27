import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/layouts/Modal';
import toast from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null
    });
  
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

      //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("Something Went Wrong ,Please Try Again", error)
    } finally {
      setLoading(false);
    }
  }

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //validation Checks
    if (!category.trim()) {
      toast.error('Category is required')
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount Should Be A valid Number Greater Than 0.");
      return
    }
    if (!date) {
      toast.error("Date Is Required")
      return
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added Sucessfully");
      fetchExpenseDetails();
    }
    catch (error) {
      console.error(
        "Error In Adding Expense",
        error.response?.data?.message || error.message
      )
    }
  };

  //Delete Expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({show:false,data:null})
      toast.success('Expense details deleted succesfully')
      fetchExpenseDetails();
    }
    catch(error){
      console.error(
        "Error in Deleting Expense",
        error.response?.message||error.message
      )
    }
   };

   //Handle Download Expense Details
   const handleDownloadExpenseDetails = async ()=>{
      try{
        const response = await axiosInstance.get(
          API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
          {
            responseType:'blob'
          }
        );
        //Create A URL for the Blob
        const url = window.URL.createObjectURL(new Blob ([response.data]));
        const link= document.createElement('a')
        link.href=url;
        link.setAttribute('download','expense_details.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url)
      }
      catch(error){
        console.error("Error Downloading expense Details:",error)
        toast.error("Failed to Download expense Details,Please try again");
      }
   }

  useEffect(()=>{
    fetchExpenseDetails();

    return ()=>{}
  },[])
  
  return (
 <DashboardLayout activeMenu='Expense'>
  <div className='my-5 mx-auto'>
    <div className='grid grid-cols-1 gap-6'>
      <div className=''>
        <ExpenseOverview
        transactions={expenseData}
        onExpenseIncome={()=> setOpenAddExpenseModal(true)}
        />
      </div>
      <ExpenseList
       transactions={expenseData}
       onDelete={(id)=>{
        setOpenDeleteAlert({show:true,data:id});
       }}
       onDownload={handleDownloadExpenseDetails}
       />
    </div>

    <Modal
    isOpen={openAddExpenseModal}
    onClose={()=> setOpenAddExpenseModal(false)}
    title="Add Expense"
    >
      <AddExpenseForm onAddExpense={handleAddExpense}/>
    </Modal>
    <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show:false ,data:null})}
        title='Delete Expense'
        >
          <DeleteAlert
          content="Are you sure you want to delete this expense Details ?"
          onDelete={()=>deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
  </div>
 </DashboardLayout>
    
  )
}

export default Expense
