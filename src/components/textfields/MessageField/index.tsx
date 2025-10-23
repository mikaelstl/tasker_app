import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { Text } from "../../base/Text";
import { Button, Container, Field } from "./style";
import { useState } from "react";

interface MessageFieldProps {
  send: (value: string) => void
}

export function MessageField({ send }: MessageFieldProps) {
  const [ message, setMessage ] = useState<string>('');

  const handleSend = () => {
    send(message);
    setMessage('')
  }
  
  return (
    <Container className="search-field">
      <Field id="search">
        <ChatBubbleOvalLeftIcon width="24"/>
        <input
          type="text"
          placeholder="Write something..."
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}  
        />
      </Field>
      <Button type="button" id="send" onClick={handleSend}>
        <PaperAirplaneIcon width="20"/>
        <Text>Send</Text>
      </Button>
    </Container>
  )
}