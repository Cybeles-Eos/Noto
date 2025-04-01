import style from './empty.module.css'
import img_noList from '../../images/No Files yet.svg'

function ListEmpty(){
   return(
      <div className={style.noList}>
         <img className={`${style.image} dis_u_drg`} src={img_noList} alt="" />
      </div>
   )
}

export default ListEmpty