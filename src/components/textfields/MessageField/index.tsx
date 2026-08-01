import { ChatBubbleOvalLeftIcon } from '@/components/icons/heroicons';
import { PaperAirplaneIcon } from "@/components/icons/PaperAirplaneIcon";
import { Text } from "../../base/Text";
import { Button, Container, Field } from "./style";
import { useState } from "react";

interface MessageFieldProps {
  send: (value: string) => Promise<void>
}

export function MessageField({ send }: MessageFieldProps) {
  const [ message, setMessage ] = useState<string>('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const content = message.trim();
    if (!content || sending) return;
    setSending(true);
    try {
      await send(content);
      setMessage('');
    } finally {
      setSending(false);
    }
  }
  
  return (
    <Container className="tskr-search-field">
      <Field id="search">
        <ChatBubbleOvalLeftIcon width="24"/>
        <input
          type="text"
          placeholder="Escreva algo..."
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}  
          disabled={sending}
          onKeyDown={(event) => {
            if (event.key === "Enter") void handleSend();
          }}
        />
      </Field>
      <Button type="button" id="send" onClick={() => void handleSend()} disabled={sending || !message.trim()}>
        <PaperAirplaneIcon size={15}/>
        <Text>{sending ? "Enviando..." : "Enviar"}</Text>
      </Button>
    </Container>
  )
}
