import { FlagIcon } from "@heroicons/react/16/solid";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import { Tag } from "./style";
import { Text } from "../../../base/Text";

interface CalendarTagProps {
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
        <h4>title</h4>
        <Text>description</Text>
      </div>
    </Tag>
  )
}