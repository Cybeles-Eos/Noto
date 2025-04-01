import style from './home.module.css'
import styleAbout from './about.module.css'
import { useNavigate } from 'react-router-dom'
import pips from '../../images/Pips.png' 

function Home(){
   const navigate = useNavigate();

   return(
      <>
         <main className={style.main}>
            <div className={style.introduction}>

               <p id='title' className={`${style.title} animations`}>Your digital desk for tasks and notes</p>
               <label htmlFor="title" className={`${style.label} animations`}>Capture ideas, organize tasks, and stay on top of your day effortlessly. Your all-in-one space for planning and productivity.</label>
               <div className={`${style.buttons_con} animations`}>
                  <button onClick={() => navigate('/todo-list')} className={`${style.btn} ${style.btn_todo} dis_u_drg hm_btn`}>
                     To-do List
                  </button>
                  <button onClick={() => navigate('/personal-note')} className={`${style.btn} ${style.btn_note} dis_u_drg hm_btn`}>
                     Notes
                  </button>
               </div>

            </div>
            
            <section className={style.features_log}>
               
               <div className={style.feat_box}>
                  <h2 className={style.feat_title}>To-do List</h2>
                  <p className={style.feat_text}>A to-do list helps you stay organized by keeping track of your tasks in one place. You can create new tasks, update them as needed, delete completed ones, and save your progress for later. With a to-do list, managing your daily goals becomes simple and efficient.</p>
               </div>

               <div className={style.feat_box}>
                  <h2 className={style.feat_title}>Personal Notes</h2>
                  <p className={style.feat_text}>Personal notes help you organize thoughts, ideas, and important information in a structured way. You can create notes with a title, edit and save them, delete when needed, and even customize the header color. With features like adding dates and formatting content with breaklines, your notes stay clear and easy to manage. </p>
               </div>
               
            </section>

            <section className={styleAbout.about}>
               
               <img src={pips} className={`${styleAbout.imageAbt} dis_u_drg`} alt="Image" />
               <h2 className={styleAbout.about_title}>About</h2>
               <p className={styleAbout.about_text}>Noto is your go-to platform for organizing thoughts, tasks, and reminders efficiently. Whether you're managing a to-do list, keeping personal notes, or setting important reminders, Notes helps you stay productive and in control. Whether you're a student, professional, or just love staying organized, Log makes task management effortless with simple yet powerful tools.</p>
               <br /><br />
               <h2 className={styleAbout.about_title}>What you can do in Noto</h2>
               <p className={styleAbout.about_text}>To-do lists help you stay organized by tracking daily tasks, setting priorities, and checking off completed items, ensuring nothing gets overlooked. Meanwhile, personal notes provide a convenient space to jot down ideas, meeting notes, or quick thoughts, keeping all your important information in one place for easy access.</p>
               
            </section>
         </main>
      </>
   )
}

export default Home
