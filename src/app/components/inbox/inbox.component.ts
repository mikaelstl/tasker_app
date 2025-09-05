import { Component } from '@angular/core';
import { SearchComponent } from '../misc/search-field/search.component';
import { CreateButton } from '../buttons/create-btn/create-btn.component';
import { ChatComponent } from '../cards/chat/chat.component';
import { ScrollerComponent } from '../misc/scroller/scroller.component';

@Component({
  selector: 'inbox',
  standalone: true,
  imports: [
    SearchComponent,
    CreateButton,
    ChatComponent,
    ScrollerComponent
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class Inbox {
  chats = Array.from({ length: 4 }, (_, i) => i);
}
