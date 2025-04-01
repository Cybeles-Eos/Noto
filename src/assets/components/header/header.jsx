import { Outlet, Link } from "react-router-dom"
import { useState } from "react"
import style from './header.module.css'

import dark_logo from '../../images/N-dark.png'
import light_logo from '../../images/N-white.png'


function Header(){
   let [main_toggle, setMain_toggle] = useState(false);
   
   const lightSwitch = ()=>{
      setMain_toggle(!main_toggle);
      let light_btn = document.getElementById('light-switch');
      let html = document.getElementsByTagName('html')[0];
   
      // Button light switch.
      let mode = main_toggle ? 'false' : 'true';
      light_btn.setAttribute('data-switch-toggle', mode);
      
      // Website light switch.
      html.setAttribute('data-themes', main_toggle ? 'light' : 'dark');
   }

   let menu_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="31" height="31" fill="var(--TextColor)" shapeRendering="crispEdges"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>;
   let closeMenu_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="31" height="31" fill="var(--TextColor)" shapeRendering="crispEdges"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>;
   let [menuBtn_icon, setMenuBtn_icon] = useState(menu_icon);
   const toggleMenu = ()=> {
      if(window.innerWidth <= 720){ // Only work on 720px width.
         let menu = document.getElementById('link_container');
         let menuAttribute =  menu.getAttribute('data-menu-toggle');
         
         menu.setAttribute('data-menu-toggle', menuAttribute == 'false' ? 'true' : 'false'); // Show Menu
         setMenuBtn_icon(menuAttribute == 'false' ? closeMenu_icon : menu_icon);  // Swap Icon
      }
   }


   return(
      <>
         <nav className={style.nav}>
            <img onClick={()=>{location.reload()}} className={`${style.logo} dis_u_drg`} src={main_toggle ? light_logo : dark_logo} alt="Notes" />

            <ul id="link_container" data-menu-toggle='false' className={style.link_list}>
               <li className={style.link_con}>
                  <Link onClick={toggleMenu} className={style.link} to='/'>Home</Link>
               </li>
               <div className={style.line}></div>
               <li className={style.link_con}>
                  <Link onClick={toggleMenu} className={style.link} to='/personal-note'>Notes</Link>
               </li>
               <li className={style.link_con}>
                  <Link onClick={toggleMenu} className={style.link} to='/todo-list'>To-do list</Link>
               </li>
               <button data-switch-toggle='false' id="light-switch" onClick={lightSwitch} className={`${style.switch_mode} dis_u_drg`}>
                  <span></span>
               </button>
            </ul>
            <button onClick={toggleMenu} className={`${style.menu} dis_u_drg`}>
               {menuBtn_icon}
            </button>
         </nav>

         <Outlet />
      </>
   )
}

export default Header