import { PencilIcon, UserGroupIcon } from "@heroicons/react/16/solid"
import { CalendarIcon, ClipboardIcon, WindowIcon } from "@heroicons/react/24/solid"
import { Button, Container } from "./style"
import { Text } from "../base/Text"
import { useNavigate } from "react-router-dom"

export function ProjectMenu() {
  const navigate = useNavigate();
  
  return (
    <Container className="project-menu">
      <Button onClick={() => navigate('../overview')}>
        <WindowIcon width="20"/>
        <Text>Overview</Text>
      </Button>
      <Button onClick={() => navigate('../tasks')}>
        <ClipboardIcon width="20"/>
        <Text>Tasks</Text>
      </Button >
      <Button onClick={() => navigate('../members')}>
        <UserGroupIcon width="20"/>
        <Text>Members</Text>
      </Button >
      <Button onClick={() => navigate('../calendar')}>
        <CalendarIcon width="20"/>
        <Text>Calendar</Text>
      </Button >
      <Button onClick={() => console.log('go to edit page')}>
        <PencilIcon width="20"/>
        <Text>Edit</Text>
      </Button >
    </Container >
  )
}