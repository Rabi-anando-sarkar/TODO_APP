import React, {useState,useEffect} from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Todo from "./components/todo";
import { collection,onSnapshot,query, updateDoc , doc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebsae';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form:  `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `p-4 border ml-2 bg-purple-400 text-slate-100`,
  count: `text-center p-2`
}

function App() {
  const [todos,setTodos] = useState([]);
  const [inputs,setInputs] = useState("");

  //create Todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if(inputs === ""){
      alert("Please enter a valid Todo");
      return
    }
    await addDoc(collection(db,'todos'), {
      text: inputs,
      completed: false,
    })
    setInputs('');
  };

  //read Todo from databse
  useEffect(() => {
    const q = query(collection(db,'todos'))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
    return () => {
      unsubscribe();
    }
  },[])

  //update Todo in database
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db,'todos', todo.id), {
      completed: !todo.completed
    })
  }

  //delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db,'todos',id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={inputs} onChange={(e) => setInputs(e.target.value)} type="text" placeholder="Type Here" className={style.input}/>
          <button className={style.button}><AddOutlinedIcon/></button>
        </form>
        <ul>
          {todos.map((todo,index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
          ))}
        </ul>
        {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} todos`}</p>}
        
      </div>
    </div>
  );
}

export default App;
