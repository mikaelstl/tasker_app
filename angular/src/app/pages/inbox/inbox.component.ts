import { Component } from '@angular/core';
import { SearchComponent } from '../../components/misc/search-field/search.component';
import { CreateButton } from '../../components/buttons/create-btn/create-btn.component';
import { ChatCard } from '../../components/cards/chat-card/chat-card.component';
import { ScrollerComponent } from '../../components/misc/scroller/scroller.component';
import { TextField } from "../../components/misc/text-field/text-field.component";
import { MessageCard } from '../../components/cards/message/message.component';

@Component({
  selector: 'inbox',
  standalone: true,
  imports: [
    SearchComponent,
    CreateButton,
    ChatCard,
    ScrollerComponent,
    TextField,
    MessageCard
],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class Inbox {
  chats = Array.from({ length: 12 }, (_, i) => i);
  messages = Array.from({ length: 4 }, (_, i) => i);
}
