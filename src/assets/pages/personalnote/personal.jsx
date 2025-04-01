import style from './personal.module.css'
import noteDialog from './dialog.module.css'

import { useState, useEffect } from 'react';
import ListEmpty from '../../components/emptyList/empty.jsx';

import NoteCard from '../../components/notecard/notecard.jsx';

function PersonalNote(){
   /*
      Values overview.
      {
         title: "Card Title", 
         texts: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ipsum unde veritatis eaque. Aliquid, consequatur? <br><br>d asdas dasd asdas d as          asd asLorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, laudantium.`,
         date: "Dec 1, 2025",
         fixDate: "2025-02-27",
         words: "101",
         color: "#FF0000",
         mark: false
      }
   */
   const [notes, setNotes] = useState([]);

   useEffect(()=>{
      let storage = JSON.parse(localStorage.getItem("noteFile")) || [];
      setNotes(storage);
   }, []);

   let [openDialog, setOpenDialog] = useState(false);
   const disableOverflow = () =>{
      let html = document.getElementsByTagName('html')[0];
      html.style.overflow =  openDialog ? "auto" : "hidden";
   }

   //Check if the list is empty.
   const [isEmpty, setIsEmpty] = useState(true);
   useEffect(() => {
      setIsEmpty(notes.length === 0 ? true : false); 
   }, [notes]); // Depend on `todoLists` to update correctly
   
   const NoteDialog = ()=>{
      let [userTitle, setUserTitle] = useState('');
      let [userTxt, setUserTxt] = useState('');
      let [userNoteDate, setUserNoteDate] = useState('');
      let [userFixDate, setUserFixDate] = useState('');
      let [word_length, setWord_length] = useState(0);
      let [markClr, setMarkClr] = useState('#1d2026');

      
      const setTxtLength = (e)=> {
         let textArea = e.target.value;
         let cleanTxt = textArea.replace(/\s/g, '');
         setWord_length(cleanTxt.length);
         setUserTxt(textArea);
      }
      const setDate = (e)=>{
         let newDate = e.target.value.split('-');
         // console.log(newDate)
         if (!e.target.value) return; // Prevents running with empty input
   
         let month_text = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         let index = newDate[1] && newDate[1].charAt(0) === '0' ? Number(newDate[1].charAt(1)) : Number(newDate[1] || "1"); 
         
         let computedYear = newDate[0];
         let computedMonth = month_text[index - 1];
         let computedDay = newDate[2] && newDate[2].charAt(0) == '0' ? newDate[2].charAt(1) : newDate[2];
         
         let date = `${computedMonth} ${computedDay}, ${computedYear}`;
   
         setUserNoteDate(date);
         setUserFixDate(newDate.join('-'));
      }
      const saveNote = ()=>{
         let noteTitle = document.getElementById('note_title');
         let noteText = document.getElementById('note_text');
         let noteDate = document.getElementById('note_date');

         const activeNotifBrd = (active, remove1, remove2)=>{
            active.classList.add('brd_notif');

            remove1.classList.remove('brd_notif');
            remove2.classList.remove('brd_notif');
         }

         if(userTitle.trim().length === 0){
            activeNotifBrd(noteTitle, noteText, noteDate);
            return;
         }

         if(userTxt.trim().length === 0){
            activeNotifBrd(noteText, noteTitle, noteDate);
            return;
         }

         if(userNoteDate.length === 0){
            activeNotifBrd(noteDate, noteTitle, noteText);
            return;
         }

         let arr = [
            ...notes, 
            {
               title: userTitle, 
               texts: userTxt, 
               date: userNoteDate, 
               fixDate: userFixDate, 
               words: word_length, 
               color: markClr, 
               mark: false
            }
         ]
         setNotes(arr);
         localStorage.setItem("noteFile", JSON.stringify(arr));

         noteTitle.classList.remove('brd_notif');
         noteText.classList.remove('brd_notif');
         noteDate.classList.remove('brd_notif');
         setUserTitle('');
         noteTitle.value = '';
         setUserTxt('');
         noteText.value = '';
         setUserNoteDate('');
         noteDate.value = '';
         setUserFixDate('');
         setWord_length(0);
         setMarkClr('#1d2026');

         setOpenDialog(!openDialog);
         disableOverflow();
      }
      return(
         <>
            <div className={noteDialog.input_dialog}>
               <div className={noteDialog.input_body}>
                  <input onInput={(e)=>{ setUserTitle(e.target.value) }} id="note_title" type="text" className={noteDialog.inp_title} placeholder='Input title here...' />
                  <textarea onInput={setTxtLength} id="note_text" className={noteDialog.inp_texts} name="note_textarea" placeholder='Input text here...'></textarea>
                  <p className={noteDialog.word_count}>Words: {word_length}</p>

                  <div className={noteDialog.info_box}>
                     <div className={noteDialog.date_con}>
                        <p className={noteDialog.info_title}>Note Date: </p>
                        <input onChange={setDate} id="note_date" className={noteDialog.inp_date} type="date" />
                     </div>
                     <div className={noteDialog.color_con}>
                        <p className={noteDialog.info_title}>Mark Color: </p>
                        <input onChange={(e)=>{ setMarkClr(e.target.value) }} id="note_color" value={markClr} className={noteDialog.inp_color} type="color" />
                     </div>
                  </div>

                  <div className={noteDialog.btns}>
                     <button onClick={()=>{ 
                        setOpenDialog(!openDialog);
                        disableOverflow();
                     }} className={`${noteDialog.btn} ${noteDialog.btn_cancel} dis_u_drg`}>Cancel</button>
                     <button onClick={saveNote} className={`${noteDialog.btn} ${noteDialog.btn_save} dis_u_drg`}>Save</button>
                  </div>
               </div>
            </div>
         </>
      )
   }

   //Call back methods.
   const deleteNote = (index)=>{
      let arr = notes.filter((_,i)=> i !== index);
      setNotes(arr);
      localStorage.setItem("noteFile", JSON.stringify(arr));
   }
   const markNote = (index, marked)=>{
      let arr = [...notes];
      arr[index].mark = marked;
      arr.sort((note_a, note_b)=> (note_b.mark === true) - (note_a.mark === true));
      setNotes(arr);
      localStorage.setItem("noteFile", JSON.stringify(arr));
   }
   const updateNote = (index, title, texts, date, fixDate, words, color, mark)=>{
      let arr = [...notes];
      Object.assign(arr[index], { title, texts, date, fixDate, words, color, mark });
      setNotes(arr);
      localStorage.setItem("noteFile", JSON.stringify(arr));
   }


   return(
      <>
         <main className={style.main}>
            <div className={style.header}>
               <p className={style.title}>Personal Notes</p>
               
               <button onClick={()=>{ 
                  setOpenDialog(!openDialog);
                  disableOverflow(); 
               }} className={`${style.createBtn} dis_u_drg`}>
                  Create
               </button>
            </div>
            <hr />
            
            <section className={style.notes_container}>
               {isEmpty && <ListEmpty />}
               
               {notes.map((note, i)=> {
                  return(
                     <NoteCard 
                        {...note}
                        index={i}
                        deleteItem={deleteNote}
                        markItem={markNote}
                        updateItem={updateNote}
                        key={i}
                     />
                  )
               })}
            </section>
         </main>

         {openDialog && <NoteDialog />}
      </>
   )
}

export default PersonalNote