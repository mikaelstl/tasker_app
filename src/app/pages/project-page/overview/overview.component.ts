import { Component, Input } from '@angular/core';
import { User } from '../../../components/user/user.component';
import { TskDateBadge } from '../../../components/badges/date-badge/date-badge.component';
import { CircularProgressBar } from '../../../components/misc/c-progress-bar/c-progress-bar.component';
import { TaskCard } from '../../../components/cards/task-card/task-card.component';
import { MessageCard } from '../../../components/cards/message/message.component';
import { ImportantDates } from '../../../components/misc/important-dates/important-dates.component';
import { ProjectMenu } from '../../../components/toolbars/project-menu/project-menu.component';
import { TskText } from '../../../components/base/text/text.component';
import { TskTitle } from '../../../components/base/title/title.component';
import { ScrollerComponent } from '../../../components/misc/scroller/scroller.component';
import { Badge } from '../../../components/badges/badge/badge.component';
import { CommentCard } from '../../../components/cards/comment-card/comment-card.component';
import { TskLabel } from '../../../components/base/label/label.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    User,
    TskDateBadge,
    CircularProgressBar,
    TaskCard,
    MessageCard,
    ImportantDates,
    ProjectMenu,
    TskText,
    TskTitle,
    ScrollerComponent,
    Badge,
    CommentCard,
    TskLabel
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  tasks = Array.from({ length: 12 }, (_, i) => i);
}
