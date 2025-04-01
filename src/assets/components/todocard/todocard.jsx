import { useState } from 'react';
import style from './todocard.module.css'
import style_update from '../../pages/todolist/dialog.module.css'


import ConfirmationBox from '../Confirmation/confirmation';

function TodoCard(props){

   let remove_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='26' height='26' fill="var(--todo-gray)"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>;

   let pin = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21" fill="var(--gray-card)"><path d="M13.8273 1.69L22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69ZM14.5344 5.22554L9.86358 9.89637L7.0417 10.4607L13.5418 16.9609L14.1062 14.139L18.7771 9.46818L14.5344 5.22554Z"></path></svg>;
   let un_pin = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21" fill="var(--gray-card)"><path d="M20.9701 17.1716 19.5559 18.5858 16.0214 15.0513 15.9476 15.1251 15.2405 18.6606 13.8263 20.0748 9.58369 15.8322 4.63394 20.7819 3.21973 19.3677 8.16947 14.418 3.92683 10.1753 5.34105 8.7611 8.87658 8.05399 8.95029 7.98028 5.41373 4.44371 6.82794 3.0295 20.9701 17.1716ZM10.3645 9.39449 9.86261 9.8964 7.04072 10.4608 13.5409 16.9609 14.1052 14.139 14.6071 13.6371 10.3645 9.39449ZM18.7761 9.46821 17.4356 10.8087 18.8498 12.2229 20.1903 10.8824 20.8974 11.5895 22.3116 10.1753 13.8263 1.69003 12.4121 3.10425 13.1192 3.81135 11.7787 5.15185 13.1929 6.56607 14.5334 5.22557 18.7761 9.46821Z"></path></svg>
   let pinned = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38" fill="var(--dr-red)"><path d="M22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69L22.3126 10.1753Z"></path></svg>

   let mark = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill={props.complete ? "var(--dr-red)" : "var(--gray-card)"}><path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path></svg>;
   let edit = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="var(--gray-card)"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>;


   
   let [card_done, setCard_done] = useState(props.complete);
   //Mark on done ✅
   const handleOnDone = ()=>{
      const isDone = !card_done;
      setCard_done(isDone);       
      props.completeEdit(props.index, isDone);   
   }
   //Card Pin 📌
   let handleOnPin = ()=> {
      const pinned = !props.cPin;
      props.cardPin(pinned, props.index);
   }

   //Remove Task ⭕
   let [confirmStat, setConfirmStat] = useState(false);
   let openConfDialog = ()=>{
      setConfirmStat(!confirmStat)
      document.getElementsByTagName('html')[0].style.overflow = "hidden";
   }
   let closeConfDialog = ()=>{
      setConfirmStat(!confirmStat)
      document.getElementsByTagName('html')[0].style.overflow = "auto";
   }
   let removeThis = ()=>{
      props.removeThisList(props.index);
      setConfirmStat(!confirmStat)
      document.getElementsByTagName('html')[0].style.overflow = "auto";
   }

   //Update Task 🔧
   let [updateDialog, setUpdateDialog] = useState(false);
   const UpdateTask = ()=>{
      // Methods and value
      let [userTxt, setUserTxt] = useState(props.text);
      let [word_length, setWord_length] = useState(props.wordsLength);
      const trackLength = ()=> {
         let textArea = document.getElementById('updateTexts');
         let cleanTxt = textArea.value.replace(/\s/g, '');
         setWord_length(cleanTxt.length);
         setUserTxt(textArea.value)
      }
      const saveUpdate = ()=>{ 
         if(userTxt.trim().length === 0) {
            document.getElementById('updateTexts').classList.add('brd_notif');
            return;
         }

         document.getElementById('updateTexts').classList.remove('brd_notif');
         props.updateThisTask(props.index, userTxt, word_length);
         setUserTxt('');
         setWord_length(0);
         document.getElementById('updateTexts').value = '';

         setUpdateDialog(false);
         document.getElementsByTagName('html')[0].style.overflow = "auto";
      }

      //Debug update inputs :
      //<button onClick={()=>{console.log(userTxt + '\n:' + word_length + '\n:' + props.date + '\n:' + props.rDate)}} style={{width: 'fit-content'}}><small>Debug</small></button>
      return(
         <>
            <div className={`${style_update.input_container} ${style_update.update_dialog}`}>
               <div className={style_update.input_body}>
                  <textarea onInput={trackLength} value={userTxt} name="textUpdate-input-field" id="updateTexts" className={style_update.user_inp} placeholder='Input text here...'></textarea>
                  <label className={style_update.word_count} htmlFor="textarea">Words: {word_length}</label>
                  
                  <div className={style_update.btns}>
                     <button onClick={()=>{ 
                        setUpdateDialog(!updateDialog);
                        document.getElementsByTagName('html')[0].style.overflow = "auto";
                     }} className={`${style_update.btn} ${style_update.btn_cancel} dis_u_drg`}>Cancel</button>
                     <button onClick={saveUpdate} className={`${style_update.btn} ${style_update.btn_save} dis_u_drg`}>Save</button>
                  </div>
               </div>
            </div>
         </>
      )
   }

   return(
      <>
         <div className={style.card}>
            <div className={style.card_header}>
               {props.cPin && <span className={style.pinned}>{pinned}</span>}
               
               <button onClick={()=>{ 
                  openConfDialog()
                }} className={style.delete_card}>
                  {remove_icon}
               </button>
            </div>
            <div className={style.card_body}>
               <p className={`${style.card_sText} ${props.complete ? style.text_marked : ''}`}>{props.text}</p>
            </div>
            <div className={style.card_footer}>
               <div className={style.foo_info}>
                  <p className={`${style.ct_word_info_length} ${style.wordl}`}>Words {props.wordsLength}</p>
               </div>
               
               <div className={style.ct_tools}>
                  <button onClick={()=>{ 
                        setUpdateDialog(true) 
                        document.getElementsByTagName('html')[0].style.overflow = "hidden";
                     }} className={`${style.btn_tools} dis_u_drg`}>
                     {edit}
                  </button>
                  <button onClick={handleOnDone} className={`${style.btn_tools} dis_u_drg`}>
                     {mark}
                  </button>
                  <button onClick={handleOnPin} className={`${style.btn_tools} dis_u_drg`}>
                     {props.cPin ? un_pin : pin}
                  </button>
               </div> 
            </div>
         </div>

         {updateDialog && <UpdateTask />}
         {confirmStat && <ConfirmationBox  closeDiag={closeConfDialog} removeList={removeThis}/>}
      </>
   )
}

export default TodoCard