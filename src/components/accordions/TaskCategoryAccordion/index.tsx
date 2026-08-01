import { AltArrowDown as ChevronDownIcon, AltArrowUp as ChevronUpIcon } from "@/components/icons/solar-icons";
import { useEffect, useState } from "react";
import { Accordion, Header, Tasks } from "./style";
import { Scroller } from "../../misc/Scroller";
import { ItalicTitle } from "../../base/ItalicTitle";
import { TaskCard } from "../../cards/TaskCard";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import { Title } from "../../base/Title";

export function TaskCategoryAccordion(props: { visible?: boolean, title: string, tasks: TaskDTO[] }) {
  const [visible, setVisible] = useState(props.visible ?? false);

  const [icon, setIcon] = useState(<ChevronDownIcon width={24} />)

  const handleVisible = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (visible) {
      setIcon(<ChevronUpIcon width={24} />)
    } else {
      setIcon(<ChevronDownIcon width={24} />)
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
                ? <Scroller orientation="horizontal" gap={12}>
                  {
                    props.tasks.map(task => <TaskCard
                                              key={task.id}
                                              projectkey={task.projectkey}
                                              code={task.code}
                                              title={task.name}
                                              owner={task.owner?.userkey}
                                              priority={task.priority}
                                              deadline={task.deadline}
                                            />)
                  }
                </Scroller>
                : <ItalicTitle>Nenhuma tarefa encontrada</ItalicTitle>
            }
          </Tasks>
          : <></>
      }
    </Accordion>
  )
}
