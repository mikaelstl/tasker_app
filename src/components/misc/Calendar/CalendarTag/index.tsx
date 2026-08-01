import { Clipboard as ClipboardIcon, Flag as FlagIcon } from "@/components/icons/solar-icons";
import { Tag } from "./style";

interface CalendarTagProps {
  title: string,
  type?: 'task' | 'event';
}

export function CalendarTag(props: CalendarTagProps) {
  const flags = {
    'task': <FlagIcon width={18}/>,
    'event': <ClipboardIcon width={18}/>
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
