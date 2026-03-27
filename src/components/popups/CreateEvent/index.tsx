import { Card, Overlay } from "./style";
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
import { ContentHeader } from "../../base/ContentHeader";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import { Text } from "../../base/Text";

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
    <Overlay className="tskr-popup-overlay">
      <Card className="tskr-popup-create-project">
        <ContentHeader
          title="Add Event"
        >
          <CreateButton type="submit">
            <Text>Add event</Text>
          </CreateButton>
          <DeleteBtn onClick={handleClose}/>
        </ContentHeader>
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
        </Form>
      </Card>
    </Overlay>
  )
}