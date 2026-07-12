import { useEffect, useMemo, useState } from "react";
import { FolderKanban, Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useServices } from "@/hooks/useServices";
import { ProjectProgress, type ProjectDTO } from "@/service/types/project/project.dto";

import { ProjectTile } from "@/components/tiles/ProjectTile";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import type { ApiError } from "@/service/types/response/error";
import { toast } from "sonner";

const progressOptions: ProgressFilter[] = [
  { value: "ALL", label: "Todos" },
  { value: ProjectProgress.OVERDUE, label: "Atrasado" },
  { value: ProjectProgress.STARTED, label: "Iniciado" },
  { value: ProjectProgress.REVIEW, label: "Em revisão" },
  { value: ProjectProgress.PENDING, label: "Pendente" },
  { value: ProjectProgress.DONE, label: "Concluído" },
] satisfies readonly ProgressFilter[];

type ProgressFilterCategories = "ALL" | ProjectProgress;

type ProgressFilter = {
  value: ProgressFilterCategories;
  label: string;
};

export function Projects() {
  const { org } = useOrganization();
  const { ProjectService } = useServices();

  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [progressFilter, setProgressFilter] = useState<ProgressFilterCategories>("ALL");

  const handlePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const loadProjects = async () => {
    try {
      const response = await ProjectService.list({
        ownerkey: org?.orgkey
      });
      
      console.log(response.data);

      setProjects(response.data);
    } catch (err) {
      const { errors } = err as ApiError;

      errors?.forEach(
        err => {
          toast.warning(err.message);
        }
      );

      setProjects([]);
    }
  }

  useEffect(() => {
    if (!org) return;

    loadProjects();
  }, [ProjectService, isPopupOpen, org]);

  const filteredProjects = useMemo(() => {
    if (progressFilter === "ALL") {
      return projects;
    }

    return projects.filter((project) => project.progress === progressFilter);
  }, [progressFilter, projects]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2 overflow-hidden p-4 md:p-4">
      {/* <CreateProjectPopup showPopup={isPopupOpen} closePopup={handlePopup} /> */}

      {
        org?.role === OrgRole.OWNER
          ? <section className="tskr-projects-header flex flex-row justify-end gap-4 p-4 sm:p-6">
            <Button className="p-6 tracking-widest w-fit" onClick={() => console.log("TO CREATE PROJECT PAGE")}>
              <Plus className="size-4" />
              Novo projeto
            </Button>
          </section>
          : <></>
      }

      <section className="tskr-projects-content flex min-h-0 flex-1 flex-col">
        <div className="tskr-filter-options flex gap-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-0.5 w-full shadow-sm">
            <Search className="size-4 shrink-0 text-secondary-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-8 border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="tskr-projects-progress-filter flex items-center gap-2 text-secondary-foreground h-full">
            <Select<ProgressFilterCategories>
              value={progressFilter}
              onValueChange={(value) => setProgressFilter(value ?? "ALL")}
            >
              <SelectTrigger className="w-32 bg-secondary">
                <SlidersHorizontal className="mr-2 size-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {progressOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4 md:p-5">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div key={project.id}>
                    <ProjectTile
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      progress={project.progress}
                      due_date={project.due_date}
                    />
                  </div>
                ))
              ) : (
                <Card className="bg-background/70">
                  <CardContent className="flex flex-col items-center justify-center gap-2 py-14 text-center">
                    <FolderKanban className="size-10 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="font-medium text-md">Nenhum projeto encontrado</p>
                      <p className="max-w-sm text-md text-muted-foreground">
                        Crie um novo projeto para começar a organizar o trabalho do seu time.
                      </p>
                    </div>
                    <Button onClick={handlePopup} variant="secondary" className="p-4">
                      <Plus className="size-4" />
                      Criar projeto
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </section>
    </div>
  )
}
