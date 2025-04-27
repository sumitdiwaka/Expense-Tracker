import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import Infocard from '../../components/Cards/Infocard';
import { IoMdCard } from 'react-icons/io';
import { addThousandSeprator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something Went Wrong,Please Try Again", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
    return () => { };
  }, [])

    // Handle logout
    const handleLogout = () => {
      // Perform your logout logic here, such as clearing auth tokens
      localStorage.removeItem("authToken");
  
      // Redirect to the login page after logout
      navigate("/login");
    };

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Infocard
          icon={<IoMdCard />}
            label="Total Balance"
            value ={addThousandSeprator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
            />

             <Infocard
          icon={<LuWalletMinimal />}
            label="Total Income"
            value ={addThousandSeprator(dashboardData?.totalIncome
              || 0)}
            color="bg-orange-500"
            />

             <Infocard
          icon={<LuHandCoins />}
            label="Total Expense"
            value ={addThousandSeprator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
            />

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
           /> 

           <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome ={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense ||0} 
           />  

           <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpense?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpense?.transactions || []}
          />
          <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
          totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore ={()=> navigate("/income")}
          />

        </div>
      </div>
    </DashboardLayout>
  )
};

export default Home
