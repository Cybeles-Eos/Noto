import style from './note.module.css'
import noteDialog from '../../pages/personalnote/dialog.module.css'
import DOMPurify from "dompurify";

import ConfirmationBox from '../Confirmation/confirmation.jsx';
import { useState } from 'react';

function NoteCard({ title, texts, date, fixDate, words, color, mark, index, deleteItem, markItem, updateItem }){
   //shapeRendering="crispEdges"
   let bookmark_fill = <svg className={style.mark_fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color}><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"></path></svg>
   let bookmark_line_off = <svg className={style.tool_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="var(--background)" ><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path></svg>
   let bookmark_line_on = <svg className={style.tool_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="var(--background)"><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4ZM8 9H16V11H8V9Z"></path></svg>
   let delete_line = <svg className={style.tool_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="19" height="19" fill="var(--background)"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
   let edit = <svg className={style.tool_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="19" height="19" fill="var(--background)"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>;

   //Delete Methods.
   let [openConfirmation, setOpenConfirmation] = useState(false);
   let deleteThis = ()=>{
      deleteItem(index);
      setOpenConfirmation(false);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
   }
   let openConfirm = ()=>{
      setOpenConfirmation(true)
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
   }
   let cancelDelete = ()=>{
      setOpenConfirmation(false);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
   }


   let [openDialog, setOpenDialog] = useState(false);
   const disableOverflow = () =>{
      let html = document.getElementsByTagName('html')[0];
      html.style.overflow =  openDialog ? "auto" : "hidden";
   }

   const UpdateDialog = ()=>{
      let [updateTitle, setUpdateTitle] = useState(title);
      let fixHtmlTxt = texts.replace(/<br\s*\/?>/g, '\n');
      let [updateTxt, setUpdateTxt] = useState(fixHtmlTxt);
      let [updateNoteDate, setUpdateNoteDate] = useState(date);
      let [updateFixDate, setUpdateFixDate] = useState(fixDate);
      let [updateWordLength, setUpdateWordLength] = useState(words);
      let [updateMarkClr, setUpdateMarkClr] = useState(color);

      const setTxtLength = (e)=> {
         let textArea = e.target.value;
         let cleanTxt = textArea.replace(/\s/g, '');
         setUpdateWordLength(cleanTxt.length);
         setUpdateTxt(textArea);
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
   
         setUpdateNoteDate(date);
         setUpdateFixDate(newDate.join('-'));
      }
      const saveUpdate = ()=>{
         let noteTitle = document.getElementById('note_title');
         let noteText = document.getElementById('note_text');
         let noteDate = document.getElementById('note_date');
         const activeNotifBrd = (active, remove1, remove2)=>{
            active.classList.add('brd_notif');

            remove1.classList.remove('brd_notif');
            remove2.classList.remove('brd_notif');
         }
         if(updateTitle.trim().length === 0){
            activeNotifBrd(noteTitle, noteText, noteDate);
            return;
         }
         if(updateTxt.trim().length === 0){
            activeNotifBrd(noteText, noteTitle, noteDate);
            return;
         }
         if(updateNoteDate.length === 0){
            activeNotifBrd(noteDate, noteTitle, noteText);
            return;
         }

         let fixHtmlTxt = updateTxt.replace(/\n/g, '<br />');
         updateItem(index, updateTitle, fixHtmlTxt, updateNoteDate, updateFixDate, updateWordLength, updateMarkClr, mark);
         setOpenDialog(!openDialog);
         disableOverflow();
      }
      return(
         <>
            <div className={noteDialog.input_dialog}>
               <div className={noteDialog.input_body}>
                  <input onInput={(e)=>{ setUpdateTitle(e.target.value) }} value={updateTitle} id="note_title" type="text" className={noteDialog.inp_title} placeholder='Input title here...' />
                  <textarea onInput={setTxtLength} value={updateTxt} id="note_text" className={noteDialog.inp_texts} name="note_textarea" placeholder='Input text here...'></textarea>
                  <p className={noteDialog.word_count}>Words: {updateWordLength}</p>

                  <div className={noteDialog.info_box}>
                     <div className={noteDialog.date_con}>
                        <p className={noteDialog.info_title}>Note Date: </p>
                        <input onChange={setDate} value={updateFixDate} id="note_date" className={noteDialog.inp_date} type="date" />
                     </div>
                     <div className={noteDialog.color_con}>
                        <p className={noteDialog.info_title}>Mark Color: </p>
                        <input onChange={(e)=>{ setUpdateMarkClr(e.target.value) }} value={updateMarkClr} id="note_color" className={noteDialog.inp_color} type="color" />
                     </div>
                  </div>

                  <div className={noteDialog.btns}>
                     <button onClick={()=>{ 
                        setOpenDialog(!openDialog);
                        disableOverflow();
                     }} className={`${noteDialog.btn} ${noteDialog.btn_cancel} dis_u_drg`}>Cancel</button>
                     <button onClick={saveUpdate} className={`${noteDialog.btn} ${noteDialog.btn_save} dis_u_drg`}>Save</button>
                  </div>
               </div>
            </div>
         </>
      )
   }


   return(
      <>
         <div className={style.note}>
            {mark && bookmark_fill}

            <div className={style.note_body}>
               <pre className={style.length_date}>{words} words  |  {date}</pre>
               <div className={style.note_title}>
                  <h1 className={style.title}>{title}</h1>
               </div>
               <hr />
               <div className={style.note_texts}>

                  <pre className={style.text} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(texts, { ALLOWED_TAGS: ["br"] }) }} />

               </div>

            </div>
            <div className={style.tools}>
               <button onClick={()=>{
                  setOpenDialog(!openDialog);
                  disableOverflow();
               }} className={`${style.tools_btn}`}><i className='dis_u_drg'>{edit}</i></button>
               <button onClick={()=>{ markItem(index, !mark) }} className={`${style.tools_btn}`}><i className='dis_u_drg'>{mark ? bookmark_line_on : bookmark_line_off}</i></button>
               <button onClick={openConfirm} className={`${style.tools_btn}`}><i className='dis_u_drg'>{delete_line}</i></button>
            </div>
         </div>

         {openDialog && <UpdateDialog />}
         {openConfirmation && <ConfirmationBox closeDiag={cancelDelete} removeList={deleteThis} />}
      </>
   )
}

export default NoteCard
