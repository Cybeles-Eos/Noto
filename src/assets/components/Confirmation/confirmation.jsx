import style from './confirm.module.css'
import { useState, useEffect } from 'react';

function ConfirmationBox({closeDiag, removeList}){
   const [size, setSize] = useState(window.innerWidth <= 580 ? 30 : 40);
   useEffect(() => {
      window.addEventListener("resize", ()=>{
         setSize(window.innerWidth <= 580 ? 30 : 40);
      });
   }, []);

   return(
      <div className={style.confirm_box}>
         <div className={style.confirm_body}>
            <div className={style.logo_body}>
               <div className={`${style.logo_con} dis_u_drg`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="var(--white)"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
               </div>
            </div>

            <p className={style.text}>Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className={style.buttons_con}>
               <button onClick={()=>{ closeDiag() }} className={`${style.btn} ${style.cancel} dis_u_drg`}>Cancel</button>
               <button onClick={()=>{ removeList() }} className={`${style.btn} ${style.confirm} dis_u_drg`}>Confirm</button> 
            </div>
         </div>
      </div>
   )
}

export default ConfirmationBox