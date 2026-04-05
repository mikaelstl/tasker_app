import { CreateButton } from "../../../components/buttons/CreateButton";
import { CalendarArea, Container } from "./style";
import { Calendar } from "../../../components/misc/Calendar";
import { useEffect, useState } from "react";
import { CreateEventPopup } from "../../../components/popups/CreateEvent";
import type { EventDTO } from "../../../service/types/events/event.dto";
// import { useApi } from "../../../hooks/useApi";
// import { Toasts } from "../../../maps/toasts";
// import type { ApiError } from "../../../service/types/response/error";
// import { useNavigate, useParams } from "react-router-dom";
// import type { EventQueryDTO } from "../../../service/types/events/event.query.dto";
// import type { ApiResponse } from "../../../service/types/response/response";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { Text } from "../../../components/base/Text";

export function Events() {
  /* const api = useApi();

  const navigate = useNavigate();

  const { id } = useParams(); */

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [ events, setEvents ] = useState<EventDTO[]>([]);
  // const getEvents = async () => {
  //   try {
  //     const response: ApiResponse = await api.get<EventQueryDTO>({
  //       route: `/events`,
  //       params: {
  //         projectkey: id
  //       }
  //     });

  //     setEvents(response.data);
  //   } catch (error) {
  //     const { errors } = error as ApiError;
      
  //     errors?.forEach(
  //       err => {
  //         const notify = Toasts[err.level];
  //         notify(err.message);
  //       }
  //     )

  //     navigate('../../')
  //   }
  // }

  useEffect(() => {
    setEvents([{
    id: '2d715ef9',
    title: 'Entrega',
    projectkey: 'b7d621f9',
    date: new Date().toISOString()
  }])
  }, [isPopupOpen])

  return (
    <Container className="calendar-page">
      <CreateEventPopup showPopup={isPopupOpen} closePopup={handleClosePopup} />
      <ContentHeader
        title=""
      >
        <CreateButton type="button" onClick={handleOpenPopup}>
          <Text>New Event</Text>
        </CreateButton>
      </ContentHeader>
      <CalendarArea id="calendar-area">
        <Calendar events={events}/>
      </CalendarArea>
    </Container>
  )
}