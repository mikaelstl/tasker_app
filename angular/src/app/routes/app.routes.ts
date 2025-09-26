import { Route, Routes } from '@angular/router';
import { LoginPage } from '../screens/login-page/login-page.component';
import { Home } from '../screens/home/home.component';
import { Workspace } from '../pages/workspace/workspace.component';
import { Projects } from '../pages/projects/projects.component';
import { Inbox } from '../pages/inbox/inbox.component';
import { Affiliations } from '../components/affiliations/affiliations.component';
import { ProjectPage } from '../pages/project-page/project-page.component';
import { OverviewComponent } from '../pages/project-page/overview/overview.component';
import { MembersComponent } from '../pages/project-page/members/members.component';
import { TasksComponent } from '../pages/project-page/tasks/tasks.component';
import { Events } from '../pages/project-page/events/events.component';
import { Profile } from '../pages/profile/profile.component';

const ProjectsRoute: Route = {
  path: 'projects',
  component: Projects,
  children: [
    {
      path:'overview',
      component: ProjectPage
    }
  ]
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/project',
    redirectTo: 'home/project/overview',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    component: LoginPage
  },
  {
    path: 'home',
    component: Home,
    children: [
      {
        path: 'workspace',
        component: Workspace
      },
      {
        path: 'projects',
        component: Projects,
      },
      {
        path: 'project',
        component: ProjectPage,
        children: [
          {
            path: 'overview',
            component: OverviewComponent
          },
          {
            path: 'tasks',
            component: TasksComponent
          },
          {
            path: 'members',
            component:MembersComponent,
          },
          {
            path: 'calendar',
            component: Events
          }
        ],
      },
      {
        path: 'inbox',
        component: Inbox
      },
      {
        path: 'affiliations',
        component: Affiliations
      },
      {
        path: 'profile',
        component: Profile
      }
    ]
  }
]