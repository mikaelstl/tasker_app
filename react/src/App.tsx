import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Workspace } from "./screens/Workspace"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace/>}/>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}>
          <Route index element={<Navigate to="workspace" replace/>}/>
  
          <Route path="workspace" element={<Workspace/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
