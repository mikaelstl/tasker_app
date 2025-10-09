import { UserGroupIcon } from "@heroicons/react/16/solid"
import { CalendarIcon, ClipboardIcon, WindowIcon } from "@heroicons/react/24/solid"
import { Button, Container } from "./style"
import { Text } from "../base/Text"
import { useNavigate } from "react-router-dom"

export function ProjectMenu() {
  const navigate = useNavigate();
  
  return (
    <Container className="project-menu">
      <Button onClick={() => navigate('/home/project/overview')}>
        <WindowIcon width="20"/>
        <Text>Overview</Text>
      </Button>
      <Button onClick={() => navigate('/home/project/tasks')}>
        <ClipboardIcon width="20"/>
        <Text>Tasks</Text>
      </Button >
      <Button onClick={() => navigate('/home/project/members')}>
        <UserGroupIcon width="20"/>
        <Text>Members</Text>
      </Button >
      <Button onClick={() => navigate('/home/project/calendar')}>
        <CalendarIcon width="20"/>
        <Text>Calendar</Text>
      </Button >
    </Container >
  )
}