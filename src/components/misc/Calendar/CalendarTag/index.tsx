import { Clipboard, Flag } from "@/components/icons";
import { Tag } from "./style";

interface CalendarTagProps {
  title: string,
  type?: 'task' | 'event';
}

export function CalendarTag(props: CalendarTagProps) {
  const flags = {
    'task': <Flag/>,
    'event': <Clipboard/>
  }

  return (
    <Tag className={`calendar-tag ${props.type ?? "task"}`}>
      {flags[props.type ?? 'task']}
      <div id="infos">
        <h4>{props.title}</h4>
      </div>
    </Tag>
  )
}