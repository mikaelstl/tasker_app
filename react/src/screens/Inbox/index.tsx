import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { ChatCard } from "../../components/cards/ChatCard/index.tsx";
import { MessageCard } from "../../components/cards/MessageCard/index.tsx";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { MessageField } from "../../components/textfields/MessageField/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { Chats, Content, Messages, MessagesArea,} from "./style.ts";

export function Inbox() {
  const chats = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Content className="inbox-content">
      <Chats className="chats">
        <div className="chats-item">
          <CreateButton>New Chat</CreateButton>
        </div>
        <div className="chats-item">
          <SearchField filter/>
        </div>
        <div className="chats-item" id="chats-list">
          <Scroller className="vertical">
            {
              chats.map(_ => <ChatCard />)
            }
          </Scroller>
        </div>
      </Chats>
      <MessagesArea className="messages-area">
        <Messages className="messages">
          <MessageCard type="sent">bdkjbadhaiehdaeu</MessageCard>
          <MessageCard type="recived">bdkjbadhaiehdaeu</MessageCard>
        </Messages>
        <MessageField />
      </MessagesArea>
    </Content>
  )
}