import React, { ReactElement } from 'react'

interface TableProps {
    children: any;
}

export default function Table(props: TableProps){
    function renderCa(){
        return(
            <tr>
                <th className={"text-left p-4"}>Nota</th>
                <th className={"text-left p-4"}>Data</th>
                <th className={"items-center p-4"}>Excluir</th>
            </tr>
        )
    }

    return (
        <>
            <table className={"w-full rounded-xl overflow-hidden"}>
                <thead className={"text-gray-100 bg-gradient-to-r from-purple-500 to-purple-800"}>
                    {renderCa()}
                </thead>
                <tbody className={" grid-cols-3"}>
                    {props.children}
                </tbody>
            </table>
            
        </>
    )
}
