import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Workspace } from "./screens/Workspace"
import { Projects } from "./screens/Projects"
import { Overview } from "./screens/Project/Overview"
import { Project } from "./screens/Project"
import { Events } from "./screens/Project/Events"
import { Members } from "./screens/Project/Members"
import { Tasks } from "./screens/Project/Tasks"
import { Register } from "./pages/Register"
// import { PrivateRoute } from "./routes/PrivateRoute"
import { Home } from "./pages/Home"
import { Stats } from "./screens/Project/Stats"
import { EditProject } from "./screens/Project/Edit"
import { TaskOverview } from "./screens/Project/TaskOverview"
import { PrivateRoute } from "./routes/PrivateRoute"
import { ChoseWorkspace } from "./screens/ChoseWorkspace/ChoseWorkspace"
import { Screen } from "./components/base/Screen"
import { Organization } from "./screens/Organization"
import { AcceptInvite } from "./screens/AcceptInvite"

function App() {
  return (
    <Screen>
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/workspaces" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute/>}>
          <Route path="/workspaces" element={<ChoseWorkspace />} />
          <Route path="/invite/:token" element={<AcceptInvite />} />

          <Route path="/home" element={<Home />}>
            <Route index element={<Navigate to="workspace" replace />} />

            <Route path="workspace" element={<Workspace />} />
            <Route path="projects" element={<Projects />} />
            <Route path="organization" element={<Organization />} />

            <Route path="project" element={<Project />}>
              <Route index element={<Navigate to="overview" replace />} />

              <Route path="overview" element={<Overview />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="members" element={<Members />} />
              <Route path="calendar" element={<Events />} />
              <Route path="stats" element={<Stats />} />
              <Route path="edit" element={<EditProject />} />
              <Route path="task" element={<TaskOverview />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Screen>
  )
}

export default App
