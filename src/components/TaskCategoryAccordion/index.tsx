import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Accordion, Header, Tasks } from "./style";
import { SectionTitle } from "../base/SectionTitle";
import { Scroller } from "../misc/Scroller";
import { ItalicTitle } from "../base/ItalicTitle";
import { TaskCard } from "../cards/TaskCard";
import type { TaskDTO } from "../../service/types/task/task.dto";

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
        <SectionTitle>{props.title}</SectionTitle>
      </Header>
      {
        visible ?
          <Tasks>
            {
              props.tasks.length !== 0
                ? <Scroller className="horizontal">
                  {
                    props.tasks.map(task => <TaskCard
                                              key={task.id}
                                              title={task.name}
                                              priority={task.priority}
                                              due_date={task.due_date}
                                            />)
                  }
                </Scroller>
                : <ItalicTitle>Sem projetos acessados recentemente</ItalicTitle>
            }
          </Tasks>
          : <></>
      }
    </Accordion>
  )
}