import { CreateButton } from "../../../components/buttons/CreateButton";
import { CalendarArea, Container } from "./style";
import { Calendar } from "../../../components/misc/Calendar";
import { useEffect, useState } from "react";
import { CreateEventPopup } from "../../../components/popups/CreateEvent";
import type { EventDTO } from "../../../service/types/events/event.dto";
import type { ApiError } from "../../../service/types/response/error";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { Text } from "../../../components/base/Text";
import { Toasts } from "../../../maps/toasts";
import { useNavigate, useParams } from "react-router-dom";
import { useServices } from "../../../hooks/useServices";

export function Events() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { EventService } = useServices();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [ events, setEvents ] = useState<EventDTO[]>([]);
  const getEvents = async () => {
    try {
      if (!id) return;
      const response = await EventService.list({ projectkey: id });
      setEvents(response.data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('../../')
    }
  }

  useEffect(() => {
    void getEvents();
  }, [EventService, isPopupOpen, id])

  return (
    <Container className="calendar-page">
      <CreateEventPopup showPopup={isPopupOpen} closePopup={handleClosePopup} />
      <ContentHeader
        title=""
      >
        <CreateButton type="button" onClick={handleOpenPopup}>
          <Text>Novo evento</Text>
        </CreateButton>
      </ContentHeader>
      <CalendarArea id="calendar-area">
        <Calendar events={events}/>
      </CalendarArea>
    </Container>
  )
}
