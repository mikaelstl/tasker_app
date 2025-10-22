import { XMarkIcon } from "@heroicons/react/16/solid";
import { Card, Close, Header, Overlay } from "./style";
import { Title } from "../../base/Title";
import { TextInput } from "../../base/TextInput";
import { CalendarInput } from "../../base/CalendarInput";
import { useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import { useApi } from "../../../hooks/useApi";
import { Form } from "../../misc/Form/style";
import type { PopupProps } from "../popup.props";
import type { CreateEventDTO } from "../../../service/types/events/event.create.dto";
import { useParams } from "react-router-dom";
import { Toasts } from "../../../maps/toasts";
import type { ApiResponse } from "../../../service/types/response/response";

export function CreateEventPopup(props: PopupProps) {
  const api = useApi();

  const { id } = useParams();

  const [eventName, setEventName] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleClose = () => {
    setDate('');
    setEventName('');
    props.closePopup();
  }

  const onSubmit = (ev:React.FormEvent) => {
    ev.preventDefault();

    const event: CreateEventDTO = {
      title: eventName,
      date: new Date(date),
      project: id!,
    }

    api.post<CreateEventDTO>({
      route: '/events',
      data: event
    }).then(
      (response: ApiResponse) => {
        Toasts['info'](response.message as string)
      }
    );

    props.closePopup();
  }

  if (!props.showPopup) return null;

  return (
    <Overlay className="popup-overlay">
      <Card className="popup-create-project">
        <Header>
          <Title>Add event</Title>
          <Close onClick={handleClose}><XMarkIcon width={24} /></Close>
        </Header>
        <Form onSubmit={onSubmit}>
          <TextInput
            label="Event name"
            value={eventName}
            onChange={(value) => setEventName(value)}
          />
          <CalendarInput
            label="Date"
            value={date}
            onChange={(value) => setDate(value)}
          />
          <CreateButton type="submit">Add event</CreateButton>
        </Form>
      </Card>
    </Overlay>
  )
}