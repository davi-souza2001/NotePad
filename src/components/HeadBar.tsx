import React from 'react';
import useAuth from '../data/hook/useAuth';
import ForceAuthentication from "../components/auth/ForceAuthentication";


export default function HeadBar(){
    const hour = new Date().getHours();
    let mensage;
    
    
    if(hour >= 0 && hour <= 4){
        mensage = ("Boa Madrugada ");
    } else if(hour >= 5 && hour <= 12){
        mensage = ("Bom Dia ");
    } else if(hour >= 13 && hour<= 19){
        mensage = ("Boa Tarde ");
    } else if (hour >= 20 && hour <= 23){
        mensage = ("Boa Noite ");
    } else{
        mensage = "Ola ";
    }

    const { user, logout } = useAuth();

    return (
        <ForceAuthentication>
            <div className={`
                flex items-center  justify-between h-20 bg-gray-900
                text-white  font-poppins px-4 sm: text-sm
            `}>
                <div className={`
                    bg-purple-900 font-poppins rounded-md p-2 
                `}>
                    {mensage}{`${user?.name} !` ?? "user"}
                </div>
                <div className={"flex justify-center "}>
                    <div className={"mx-5 bg-purple-900 rounded-md px-1  h-10 flex justify-center items-center"}>
                        Suas notas
                    </div>
                    <div className={"bg-purple-900 rounded-full cursor-pointer flex items-center justify-center w-24"} onClick={logout}>
                        <h3 className={"text-xs"}>Fazer Logout</h3>
                    </div>
                </div>
            </div>
        </ForceAuthentication>
    )
}
