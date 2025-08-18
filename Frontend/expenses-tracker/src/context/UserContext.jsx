import React, { createContext,useState} from "react";


export const UserContext = createContext();

 const UserProvider =  ({children})=>{
 const [user, setUser] = useState(null);
 //Function To Update User Data
 const updateUser = (userData) =>{
    setUser(userData);
 };
 //Function To Clear User Data (e.g, On LogOut)
 const clearUser = () =>{
    setUser(null);
    };
    return (
        <UserContext.Provider value={{
            user,
            updateUser,
            clearUser,
            }}>
                {children}
            </UserContext.Provider>
    );
}

export default UserProvider;
