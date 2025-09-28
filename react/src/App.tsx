import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Workspace } from "./pages/Workspace"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace/>}/>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/workspace" element={<Workspace/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
