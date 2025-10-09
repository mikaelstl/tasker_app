import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { Text } from "../../base/Text";
import { Button, Container, Search } from "./style";

interface MessageFieldProps {
  // filter?: boolean;
  // sort?: boolean;
}

export function MessageField(props: MessageFieldProps) {
  return (
    <Container className="search-field">
      <Search id="search">
        <ChatBubbleOvalLeftIcon width="24"/>
        <input type="text" placeholder="Search"/>
      </Search>
      <Button type="button" id="send">
        <PaperAirplaneIcon width="20"/>
        <Text>Send</Text>
      </Button>
    </Container>
  )
}