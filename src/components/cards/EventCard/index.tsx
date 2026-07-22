import {
  ArchiveBoxArrowDownIcon,
  BeakerIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { EventCategory } from "@/service/types/events/event.dto"
import Palette from "@/assets/palette"
import { Card, Content, Details, Icon, ProjectTitle, Time, Title } from "./style"

interface EventCardProps {
  title: string
  time: string
  category: EventCategory
  projectTitle?: string
}

interface EventCategoryIcon {
  component: typeof CalendarDaysIcon
  color: string
  backgroundColor: string
}

const eventCategoryIcons: Record<EventCategory, EventCategoryIcon> = {
  [EventCategory.RELEASE]: {
    component: ArchiveBoxArrowDownIcon,
    color: Palette.lightBlue,
    backgroundColor: Palette.lightBlue_50,
  },
  [EventCategory.MEETING]: {
    component: UserGroupIcon,
    color: Palette.green,
    backgroundColor: Palette.green_25,
  },
  [EventCategory.REVIEW]: {
    component: ClipboardDocumentCheckIcon,
    color: Palette.yellow,
    backgroundColor: Palette.yellow_25,
  },
  [EventCategory.PLANNING]: {
    component: CalendarDaysIcon,
    color: Palette.purple,
    backgroundColor: Palette.purple_25,
  },
  [EventCategory.TESTS]: {
    component: BeakerIcon,
    color: Palette.red,
    backgroundColor: Palette.red_25,
  },
  [EventCategory.LAUNCH]: {
    component: RocketLaunchIcon,
    color: Palette.orange,
    backgroundColor: Palette.orange_25,
  },
}

export function EventCard({ title, time, category, projectTitle }: EventCardProps) {
  const categoryIcon = eventCategoryIcons[category] ?? eventCategoryIcons[EventCategory.PLANNING]
  const CategoryIcon = categoryIcon.component

  return (
    <Card className="tskr-event-card">
      {projectTitle ? (
        <ProjectTitle title={projectTitle}>{projectTitle}</ProjectTitle>
      ) : null}

      <Details>
        <Icon
          $color={categoryIcon.color}
          $backgroundColor={categoryIcon.backgroundColor}
        >
          <CategoryIcon width={20} aria-hidden="true" />
        </Icon>

        <Content>
          <Title>{title}</Title>
          <Time>{time}</Time>
        </Content>
      </Details>
    </Card>
  )
}
