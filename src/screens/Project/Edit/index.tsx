import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarInput } from "../../../components/base/CalendarInput";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Text } from "../../../components/base/Text";
import { TextAreaInput } from "../../../components/base/TextAreaInput";
import { TextInput } from "../../../components/base/TextInput";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { DeleteBtn } from "../../../components/buttons/DeleteBtn";
import { Infos } from "../../../components/popups/CreateProject/style";
import { AdvancedSettings, Container, Content, MembersArea } from "./style";
import { User } from "../../../components/misc/User";
import { DeleteWidget } from "../../../widgets/cards/DeleteWidget";
import { Title } from "../../../components/base/Title";
import { useServices } from "../../../hooks/useServices";
import { useToast } from "../../../hooks/useToast";
import type { ApiError } from "../../../service/types/response/error";
import type { ProjectWithMembersDTO } from "../../../service/types/project/project.dto";
import { ProjectStage } from "../../../service/types/project/project.dto";
import { SelectInput } from "../../../components/base/SelectInput";

const toLocalInput = (iso: string) => {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ProjectService } = useServices();
  const notifications = useToast();
  const [project, setProject] = useState<ProjectWithMembersDTO | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [stage, setStage] = useState<ProjectStage>(ProjectStage.PENDING);
  const [saving, setSaving] = useState(false);

  const showError = useCallback((error: unknown, fallback: string) => {
    const apiError = error as ApiError;
    if (!apiError.errors?.length) return notifications.error(fallback);
    apiError.errors.forEach((item) => notifications[item.level](item.message));
  }, [notifications]);

  useEffect(() => {
    if (!id) return;
    void ProjectService.find(id).then(({ data }) => {
      setProject(data);
      setTitle(data.title);
      setDescription(data.description);
      setDeadline(toLocalInput(data.deadline));
      setStage(data.stage);
    }).catch((error) => showError(error, "Não foi possível carregar o projeto."));
  }, [ProjectService, id, showError]);

  const save = async () => {
    if (!id || !title.trim() || !description.trim() || !deadline) {
      notifications.warning("Preencha nome, descrição e prazo.");
      return;
    }
    const parsedDeadline = new Date(deadline);
    if (Number.isNaN(parsedDeadline.getTime())) {
      notifications.validation("Informe um prazo válido.");
      return;
    }

    setSaving(true);
    try {
      await ProjectService.update(id, {
        title: title.trim(),
        description: description.trim(),
        deadline: parsedDeadline.toISOString(),
        stage,
      });
      notifications.info("Projeto atualizado.");
      navigate("../overview");
    } catch (error) {
      showError(error, "Não foi possível atualizar o projeto.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!id || !window.confirm("Excluir este projeto permanentemente?")) return;
    try {
      await ProjectService.delete(id);
      notifications.info("Projeto excluído.");
      navigate("/home/projects");
    } catch (error) {
      showError(error, "Não foi possível excluir o projeto.");
    }
  };

  if (!project) return <Container><Text>Carregando projeto...</Text></Container>;

  return (
    <Container className="tskr-edit-project-page">
      <ContentHeader title="Editar projeto">
        <DeleteBtn onClick={() => navigate('../overview')} />
        <CreateButton type="button" disabled={saving} onClick={() => void save()}>
          <Text>{saving ? "Salvando..." : "Salvar alterações"}</Text>
        </CreateButton>
      </ContentHeader>
      <Content className="tskr-edit-fields">
        <Infos>
          <TextInput label="Nome do projeto" value={title} onChange={setTitle} />
          <TextAreaInput label="Descrição" value={description} onChange={setDescription} />
          <CalendarInput label="Prazo" value={deadline} onChange={setDeadline} />
          <SelectInput
            label="Estágio"
            type={ProjectStage}
            value={stage}
            onChange={(value) => setStage(value as ProjectStage)}
          />
        </Infos>
        <MembersArea>
          <SectionTitle>Membros</SectionTitle>
          {project.members.map((member) => <User key={member.id} username={member.userkey} />)}
        </MembersArea>
        <AdvancedSettings>
          <Title>Configurações avançadas</Title>
          <DeleteWidget onDelete={() => void remove()} />
        </AdvancedSettings>
      </Content>
    </Container>
  );
}
