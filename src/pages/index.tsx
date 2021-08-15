import React, { useEffect, useState } from "react";
import HeadBar from "../components/HeadBar";
import Table from "../components/Table";
import useAuth from "../data/hook/useAuth";
import firebase from "../firebase/config";

export default function Home() {

  const [form, setForm] = useState(false);
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [todoList, setTodoList] = useState([]);
  const { user, logout } = useAuth();


  function add() {
    setForm(true);
  }

  //Start part off firebase database

  function sub(e) {
    e.preventDefault();
    const todoRef = firebase.database().ref("Todo");
    const email = user.email;
    const list = {
      note,
      date,
      email
    }
    todoRef.push(list);
    setForm(false);
  }


  useEffect(() => {
    const todoRef = firebase.database().ref("Todo");
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setTodoList(todoList);
    })
  }, []);

//Logica ****************************************************************************

function renderNotes(){
  return todoList?.map((todo, index) => {
    if(todo.email == user?.email){
    return(
      <tr key={index}>
          <td className={"text-left p-4 text-white font-poppins"}>{todo.note}</td>
          <td className={"text-left p-4 text-white font-poppins"}>{todo.date}</td>
          <td className={"text-white font-poppins flex items-center justify-center"}><button onClick={() => firebase.database().ref("Todo").child(todo.id).remove()} className={"bg-purple-800 text-white rounded-md p-2 cursor-pointer hover:bg-purple-700"}>Delete</button></td>
      </tr>
    )}
  })
}

//Logica ************************************************************************


  //Finish part off firebase database

  return (
    <>
      <HeadBar />
      <div className={"flex items-center justify-end"}>
        <div className={"bg-purple-800 text-white px-3 py-3 rounded-md  m-4  cursor-pointer hover:bg-purple-700"}
          onClick={add}>
          Adicionar Nota !
        </div>
      </div>


      {form ?
        <form className={"flex items-center justify-center  mt-44"}>
          <div>
            <label className={"text-white font-poppins font-semibold mr-10"}>Nota</label>
            <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Adicione sua nota" className={"h-10  rounded-md sm: w-32 mr-4"} />
          </div>
          <div>
            <label className={"text-white font-poppins font-semibold mr-10 ml-10"}>Data</label>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Adicione a data para esta nota" className={"h-10 rounded-md sm: w-32"} />
          </div>
          <input type="submit" onClick={sub} className={"text-black font-poppins font-semibold mr-10 ml-10 h-10 w-20 hover:bg-purple-300 cursor-pointer sm: mt-8"} />
        </form>
        :
        <Table>
          {renderNotes()}
        </Table>
      }
    </>
  )
}

