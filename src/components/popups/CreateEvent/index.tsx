import { Card, Content, Overlay } from "./style";
import { TextInput } from "../../base/TextInput";
import { CalendarInput } from "../../base/CalendarInput";
import { useCallback, useEffect, useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import type { PopupProps } from "../popup.props";
import type { CreateEventDTO } from "../../../service/types/events/event.create.dto";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { ContentHeader } from "../../base/ContentHeader";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import { Text } from "../../base/Text";
import { useServices } from "../../../hooks/useServices";
import { SelectInput } from "../../base/SelectInput";
import { EventCategory } from "../../../service/types/events/event.dto";

export function CreateEventPopup(props: PopupProps) {
  const { EventService } = useServices();
  const { info, error: showError } = useToast();

  const { id } = useParams();

  const [eventName, setEventName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<EventCategory>(EventCategory.MEETING);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = useCallback(() => {
    setDate('');
    setEventName('');
    setCategory(EventCategory.MEETING);
    props.closePopup();
  }, [props.closePopup]);

  const onSubmit = async (ev:React.FormEvent) => {
    ev.preventDefault();

    if (!id || !eventName.trim() || !date) {
      showError('Preencha nome e data do evento');
      return;
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      showError('Informe uma data válida');
      return;
    }

    const event: CreateEventDTO = {
      title: eventName.trim(),
      date: parsedDate.toISOString(),
      project: id,
      category,
    }

    try {
      setSubmitting(true);
      const response = await EventService.create(event);
      info(response.message || 'Evento criado com sucesso');
      handleClose();
    } catch {
      showError('Não foi possível criar o evento');
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!props.showPopup) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [handleClose, props.showPopup]);

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay" onMouseDown={handleClose}>
      <Card
        as="form"
        className="tskr-popup-create-event"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-event-title"
        onSubmit={onSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ContentHeader
          title="Adicionar evento"
          titleId="create-event-title"
        >
          <CreateButton type="submit" disabled={submitting}>
            <Text>{submitting ? "Adicionando..." : "Adicionar evento"}</Text>
          </CreateButton>
          <DeleteBtn onClick={handleClose}/>
        </ContentHeader>
        <Content>
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
          <SelectInput
            label="Categoria"
            value={category}
            type={EventCategory}
            onChange={(value) => setCategory(value as EventCategory)}
          />
        </Content>
      </Card>
    </Overlay>
  )
}
