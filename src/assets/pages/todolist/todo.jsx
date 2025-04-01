import style from './todo.module.css'
import styleDialog from './dialog.module.css'
import { useState, useEffect } from 'react'

import TodoCard from '../../components/todocard/todocard.jsx'
import ListEmpty from '../../components/emptyList/empty.jsx'


function TodoList(){
   const [todoLists, setTodoList] = useState([])

   //load localStorage data only on mount or once the site display.
   useEffect(()=>{
      let storage = JSON.parse(localStorage.getItem("savedFiles")) || [];
      setTodoList(storage);
   }, [])

   let [openDialog, setOpenDialog] = useState(false);
   const disableOverflow = () =>{
      let html = document.getElementsByTagName('html')[0];
      html.style.overflow =  openDialog ? "auto" : "hidden";

      window.scrollTo({
         top: 0
      });
   }

   //Check if the list is empty.
   const [isEmpty, setIsEmpty] = useState(true);
   useEffect(() => {
      setIsEmpty(todoLists.length === 0 ? true : false); 
   }, [todoLists]); // Depend on `todoLists` to update correctly
  
 
   //Users Input Methods
   const TodoDialog = ()=>{
      // Methods and value
      let [userTxt, setUserTxt] = useState('');
      let [word_length, setWord_length] = useState(0);

      const trackLength = ()=> {
         let textArea = document.getElementById('texts');
         let cleanTxt = textArea.value.replace(/\s/g, '');
         setWord_length(cleanTxt.length)
         setUserTxt(textArea.value.trim());
      }
      const saveList = ()=> {
         if(userTxt.trim().length === 0) {
            document.getElementById('texts').classList.add('brd_notif');
            return;
         }
         
         let textArea = document.getElementById('texts');
         let array = [
            ...todoLists,
            {text: userTxt, words: word_length}
         ]
         setTodoList(array);
         localStorage.setItem("savedFiles", JSON.stringify(array));
         
         document.getElementById('texts').classList.remove('brd_notif');
         setUserTxt('');
         setWord_length(0);
         textArea.value = '';

         setOpenDialog(false); 
         disableOverflow();
      }

      return(
         <div className={styleDialog.input_container}>
            <div className={styleDialog.input_body}>
               <textarea onInput={trackLength} name="text-input-field" id="texts" className={styleDialog.user_inp} placeholder='Input text here...'></textarea>
               <label className={styleDialog.word_count} htmlFor="textarea">Words: {word_length}</label>

               <div className={styleDialog.btns}>
                  <button onClick={()=>{ 
                     setOpenDialog(!openDialog);
                     disableOverflow(); 
                  }} className={`${styleDialog.btn} ${styleDialog.btn_cancel} dis_u_drg`}>Cancel</button>
                  <button onClick={saveList} className={`${styleDialog.btn} ${styleDialog.btn_save} dis_u_drg`}>Save</button>
               </div>
            </div>
         </div>
      )
   }

   // Edit Tools Methods.
   const isDone = (index, mark)=>{
      let arr = [...todoLists]
      arr[index]['done'] = mark;
      setTodoList(arr);
      localStorage.setItem("savedFiles", JSON.stringify(arr));
   }
   const isPinned = (pin, index)=> {
      let arr = [...todoLists];

      arr[index].pin = pin; // Update pin status
      arr.sort((a, b) => (b.pin === true) - (a.pin === true)); // Reorder array: Move pinned items to the front
      setTodoList(arr);
      localStorage.setItem("savedFiles", JSON.stringify(arr));
   }
   const removeTask = (index)=>{
      let arr = todoLists.filter((_,i) => i !== index)
      setTodoList(arr);
      localStorage.setItem("savedFiles", JSON.stringify(arr));
   }
   const updatedTask = (index, text, wordLength)=>{
      let arr = [...todoLists]
      arr[index].text = text;
      arr[index].words = wordLength;
      setTodoList(arr);
      localStorage.setItem("savedFiles", JSON.stringify(arr));
   }

   return(
      <>
         <main className={style.main}>
            <div className={style.header}>
               <p className={style.title}>To-do List</p>
               
               <button onClick={()=>{ 
                  setOpenDialog(!openDialog);
                  disableOverflow(); 
               }} className={`${style.createBtn} dis_u_drg`}>
                  Add
               </button>
            </div>
            <hr />
            <section id='main_container' className={style.list_container}>
            {isEmpty && <ListEmpty />}
            
            {               
               todoLists.map((todo,i)=>{
                  return <TodoCard
                     removeThisList={removeTask}
                     complete={todo.done} 
                     completeEdit={isDone} 
                     updateThisTask={updatedTask}
                     cPin={todo.pin}
                     text={todo.text} 
                     cardPin={isPinned}
                     wordsLength={todo.words}
                     index={i} 
                     key={i}
                  />
               })
            }
            
            </section>
         </main>
         
         {openDialog && <TodoDialog />}
      </>
   )
}

export default TodoList