import { Card, Overlay } from "./style";
import { TextInput } from "../../base/TextInput";
import { CalendarInput } from "../../base/CalendarInput";
import { useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import { Form } from "../../misc/Form/style";
import type { PopupProps } from "../popup.props";
import type { CreateEventDTO } from "../../../service/types/events/event.create.dto";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { ContentHeader } from "../../base/ContentHeader";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import { Text } from "../../base/Text";
import { useServices } from "../../../hooks/useServices";

export function CreateEventPopup(props: PopupProps) {
  const { EventService } = useServices();
  const { info, error } = useToast();

  const { id } = useParams();

  const [eventName, setEventName] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleClose = () => {
    setDate('');
    setEventName('');
    props.closePopup();
  }

  const onSubmit = async (ev:React.FormEvent) => {
    ev.preventDefault();

    const event: CreateEventDTO = {
      title: eventName,
      date: new Date(date),
      project: id!,
    }

    try {
      const response = await EventService.create(event);
      info(response.message as string);
      props.closePopup();
    } catch (error) {
      console.error(error);
      error('Não foi possível criar o evento');
    }
  }

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay">
      <Card className="tskr-popup-create-project">
        <ContentHeader
          title="Adicionar evento"
        >
          <CreateButton type="submit">
            <Text>Adicionar evento</Text>
          </CreateButton>
          <DeleteBtn onClick={handleClose}/>
        </ContentHeader>
        <Form onSubmit={onSubmit}>
          <TextInput
            label="Nome do evento"
            value={eventName}
            onChange={(value) => setEventName(value)}
          />
          <CalendarInput
            label="Data"
            value={date}
            onChange={(value) => setDate(value)}
          />
        </Form>
      </Card>
    </Overlay>
  )
}
