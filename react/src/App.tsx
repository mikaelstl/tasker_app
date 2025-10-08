import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Workspace } from "./screens/Workspace"
import { Projects } from "./screens/Projects"
import { Inbox } from "./screens/Inbox"
import { Social } from "./screens/Social"
import { Overview } from "./screens/Project/Overview"
import { Project } from "./screens/Project"
import { Events } from "./screens/Project/Events"
import { Members } from "./screens/Project/Members"
import { Tasks } from "./screens/Project/Tasks"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace/>}/>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}>
          <Route index element={<Navigate to="workspace" replace/>}/>
  
          <Route path="workspace" element={<Workspace/>}/>
          <Route path="inbox" element={<Inbox/>}/>
          <Route path="social" element={<Social/>}/>
          <Route path="projects" element={<Projects/>}/>

          <Route path="project" element={<Project/>}>
            <Route index element={<Navigate to="overview" replace/>}/>
  
            <Route path="overview" element={<Overview />}/>
            <Route path="tasks" element={<Tasks />}/>
            <Route path="members" element={<Members />}/>
            <Route path="calendar" element={<Events />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
