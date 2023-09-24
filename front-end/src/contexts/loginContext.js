import { createContext, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({children})=>{
    const [modalOpen,setModalOpen] = useState(false);
    const [userLogin,setUserLogin] = useState(false);

    return <LoginContext.Provider value={{modalOpen,setModalOpen,userLogin,setUserLogin}}>{children}</LoginContext.Provider>
}
