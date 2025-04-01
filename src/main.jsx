import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route, HashRouter } from 'react-router-dom'


import Header from './assets/components/header/header.jsx'

import Home from './assets/pages/home/home.jsx'
import TodoList from './assets/pages/todolist/todo.jsx'
import PersonalNote from './assets/pages/personalnote/personal.jsx'
import NoPage from './assets/pages/404/nopage.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />}/>
        <Route path='/todo-list' element={<TodoList />}/>
        <Route path='/personal-note' element={<PersonalNote />}/>
      </Route>
      <Route path='/*' element={<NoPage />}/>
    </Routes>
  </HashRouter>
)
