import { useEffect, useState } from "react";
import { Accordion, Header, Tasks } from "./style";
import { ItalicTitle } from "../../base/ItalicTitle";
import { TaskCard } from "../../cards/TaskCard";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import { Title } from "../../base/Title";
import { ChevronDown, ChevronUp } from "@/components/icons";
import Scroller from "@/components/misc/scroller";

export function TaskCategoryAccordion(props: { visible?: boolean, title: string, tasks: TaskDTO[] }) {
  const [visible, setVisible] = useState(props.visible ?? false);

  const [icon, setIcon] = useState(<ChevronDown />)

  const handleVisible = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (visible) {
      setIcon(<ChevronUp />)
    } else {
      setIcon(<ChevronDown />)
    }
  }, [visible])

  return (
    <Accordion>
      <Header onClick={handleVisible}>
        {icon}
        <Title>{props.title}</Title>
      </Header>
      {
        visible ?
          <Tasks>
            {
              props.tasks.length !== 0
                ? <Scroller orientation="horizontal">
                  {
                    props.tasks.map(task => <TaskCard
                                              key={task.id}
                                              title={task.name}
                                              priority={task.priority}
                                              due_date={task.due_date}
                                            />)
                  }
                </Scroller>
                : <ItalicTitle>Sem tarefas cadastradas</ItalicTitle>
            }
          </Tasks>
          : <></>
      }
    </Accordion>
  )
}
