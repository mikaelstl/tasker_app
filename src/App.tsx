import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/login-page"
import { Workspace } from "./screens/Workspace"
import { Projects } from "./screens/projects-screen"
import { Overview } from "./screens/Project/Overview"
import { Project } from "./screens/Project"
import { Events } from "./screens/Project/Events"
import { Members } from "./screens/Project/Members"
import { Tasks } from "./screens/Project/Tasks"
import { Register } from "./pages/register-page"
// import { PrivateRoute } from "./routes/PrivateRoute"
import { Home } from "./pages/Home"
import { Stats } from "./screens/Project/Stats"
import { EditProject } from "./screens/Project/Edit"
import { TaskOverview } from "./screens/Project/TaskOverview"
import { PrivateRoute } from "./routes/PrivateRoute"
import { ChoseWorkspace } from "./screens/ChoseWorkspace/ChoseWorkspace"
import { Screen } from "@/components/base/Screen"
import { CreateOrg } from "./screens/CreateOrg"
import { ProtectedRoute } from "./routes/ProtectedRoute"

function App() {
  return (
    <Screen>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/workspaces" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/org/register" element={<CreateOrg />} />

            <Route path="/workspaces" element={<ChoseWorkspace />} />

            <Route element={<ProtectedRoute/>}>
              <Route path="/home" element={<Home />}>
                <Route index element={<Navigate to="workspace" replace />} />

                <Route path="workspace" element={<Workspace />} />
                <Route path="projects" element={<Projects />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </Screen>
  )
}

export default App
