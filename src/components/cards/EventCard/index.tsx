import {
  ArchiveDown as ArchiveBoxArrowDownIconOutline,
  TestTube as BeakerIconOutline,
  Calendar as CalendarDaysIconOutline,
  ClipboardCheck as ClipboardDocumentCheckIcon,
  Rocket as RocketLaunchIconOutline,
  UsersGroupRounded as UserGroupIconOutline,
} from "@/components/icons/solar-icons"
import { EventCategory } from "@/service/types/events/event.dto"
import Palette from "@/assets/palette"
import { Card, Content, Details, Icon, ProjectTitle, Time, Title } from "./style"
import type { ElementType } from "react"

interface EventCardProps {
  title: string
  time: string
  category: EventCategory
  projectTitle?: string
}

interface EventCategoryIcon {
  component: ElementType
  color: string
  backgroundColor: string
}

function eventCategoryIcon(category: EventCategory): EventCategoryIcon {
  switch (category) {
    case EventCategory.RELEASE:
      return { component: ArchiveBoxArrowDownIconOutline, color: Palette.lightBlue, backgroundColor: Palette.lightBlue_50 };
    case EventCategory.MEETING:
      return { component: UserGroupIconOutline, color: Palette.green, backgroundColor: Palette.green_25 };
    case EventCategory.REVIEW:
      return { component: ClipboardDocumentCheckIcon, color: Palette.yellow, backgroundColor: Palette.yellow_25 };
    case EventCategory.TESTS:
      return { component: BeakerIconOutline, color: Palette.red, backgroundColor: Palette.red_25 };
    case EventCategory.LAUNCH:
      return { component: RocketLaunchIconOutline, color: Palette.orange, backgroundColor: Palette.orange_25 };
    case EventCategory.PLANNING:
    default:
      return { component: CalendarDaysIconOutline, color: Palette.purple, backgroundColor: Palette.purple_25 };
  }
}

export function EventCard({ title, time, category, projectTitle }: EventCardProps) {
  const categoryIcon = eventCategoryIcon(category)
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
