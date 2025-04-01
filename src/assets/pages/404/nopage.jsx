import style from './nopage.module.css'
import page404 from '../../images/404.svg'
import { useNavigate } from 'react-router-dom';

function NoPage(){
   const navigate = useNavigate();
   return(
      <>
         <main className={style.main}>
            <img src={page404} alt="404" className={`${style.img} dis_u_drg`} />
            <p className={style.para}>The page you’re looking for doesn’t exist. It might have been moved, deleted, or never existed.</p>
            <button onClick={()=>{ navigate('/') }} className={`${style.btn} dis_u_drg`}>Go Home</button>
         </main>
      </>
   )
}

export default NoPage