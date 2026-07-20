import { jsPDF } from "jspdf";
import type {
  ProjectStats,
  ProjectStatsPeriodSnapshot,
  StatsPeriodType,
} from "@/service/types/stats/stats.types";

export type ProjectStatsReportSource = {
  reportId: string;
  periodType: StatsPeriodType;
  stats: ProjectStats;
  historicalSnapshots: ProjectStatsPeriodSnapshot[];
};

type TableColumn = {
  label: string;
  width: number;
  align?: "left" | "center" | "right";
};

const PAGE = {
  width: 210,
  height: 297,
  margin: 15,
};
const CONTENT_WIDTH = PAGE.width - (PAGE.margin * 2);
const COLORS = {
  ink: "#17213a",
  muted: "#667085",
  line: "#dfe4ec",
  light: "#f4f6f9",
  blue: "#3166e8",
  green: "#22a06b",
  amber: "#d88a18",
  red: "#d64545",
  white: "#ffffff",
};

export class ProjectStatsReportDocument {
  async generate(source: ProjectStatsReportSource): Promise<Uint8Array> {
    const document = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    document.setProperties({
      title: `Tasker - Relatório de Desempenho - ${source.stats.project.title}`,
      author: "Tasker",
      subject: "Relatório de desempenho em projetos",
    });

    this.cover(document, source);
    this.executiveSummary(document, source);
    this.evolution(document, source);
    this.members(document, source);
    this.agendaAndHealth(document, source);
    this.addFooters(document, source);

    return new Uint8Array(document.output("arraybuffer"));
  }

  private cover(document: jsPDF, source: ProjectStatsReportSource): void {
    const { stats } = source;

    document.setFillColor(COLORS.blue);
    document.rect(0, 0, PAGE.width, 4, "F");
    this.text(document, "Tasker", PAGE.margin, 25, 24, COLORS.blue, "bold");
    this.text(document, "RELATÓRIO DE", PAGE.margin, 58, 22, COLORS.ink, "bold");
    this.text(
      document,
      "DESEMPENHO EM PROJETOS",
      PAGE.margin,
      69,
      22,
      COLORS.ink,
      "bold",
    );
    this.text(
      document,
      "Acompanhamento de progresso, prazo, saúde e desempenho da equipe",
      PAGE.margin,
      82,
      10,
      COLORS.muted,
    );
    this.line(document, 92);

    const rows = [
      ["PROJETO", stats.project.title],
      ["ORGANIZAÇÃO", stats.project.organization],
      [
        "PERÍODO AVALIADO",
        `${this.date(stats.project.startedAt ?? stats.generatedAt)} a ${this.date(stats.cutoffAt)}`,
      ],
      ["RESPONSÁVEL", stats.project.manager ?? "Não definido"],
      ["DATA DE CORTE", this.dateTime(stats.cutoffAt)],
    ];
    let y = 110;

    rows.forEach(([label, value]) => {
      this.text(document, label, PAGE.margin, y, 8, COLORS.muted, "bold");
      this.text(document, value, 63, y, 10, COLORS.ink);
      y += 18;
    });

    document.setFillColor(COLORS.light);
    document.roundedRect(PAGE.margin, 218, CONTENT_WIDTH, 34, 3, 3, "F");
    this.text(
      document,
      "RELATÓRIO GERADO A PARTIR DAS ESTATÍSTICAS DO PROJETO",
      21,
      229,
      8,
      COLORS.blue,
      "bold",
    );
    this.text(
      document,
      `Código do projeto: ${stats.project.id}  •  Registro: ${source.reportId}`,
      21,
      240,
      8,
      COLORS.muted,
    );
  }

  private executiveSummary(
    document: jsPDF,
    source: ProjectStatsReportSource,
  ): void {
    const { stats } = source;

    this.sectionPage(
      document,
      "1. Resumo executivo",
      "Visão consolidada do estado atual do projeto no instante do corte.",
    );

    const cards = [
      ["TAREFAS", String(stats.summary.totalTasks), `${stats.summary.doneTasks} concluídas`],
      ["PROGRESSO", `${stats.summary.progress}%`, `${stats.summary.openTasks} abertas`],
      ["ATRASADAS", String(stats.summary.delayedTasks), "fora do prazo"],
      ["PRAZO", `${stats.deadline.daysLeft} dias`, this.date(stats.project.deadline)],
    ];
    const gap = 3;
    const width = (CONTENT_WIDTH - (gap * 3)) / 4;

    cards.forEach(([label, value, detail], index) => {
      const x = PAGE.margin + (index * (width + gap));
      document.setFillColor(COLORS.light);
      document.roundedRect(x, 49, width, 34, 2, 2, "F");
      this.text(document, label, x + 4, 58, 7, COLORS.muted, "bold");
      this.text(document, value, x + 4, 69, 16, COLORS.ink, "bold");
      this.text(document, detail, x + 4, 77, 7, COLORS.muted);
    });

    this.text(document, "ANÁLISE EXECUTIVA", PAGE.margin, 102, 9, COLORS.blue, "bold");
    const analysis = [
      `Progresso de ${stats.summary.progress}% com ${stats.summary.openTasks} tarefas abertas.`,
      stats.summary.delayedTasks > 0
        ? `${stats.summary.delayedTasks} tarefa(s) atrasada(s) exigem atenção.`
        : "Nenhuma tarefa atrasada no instante do corte.",
      `Saúde em ${stats.health.score}/100: ${this.healthLabel(stats.health.status)}.`,
      stats.health.reason,
      `Entrega projetada: ${this.date(stats.health.projectedDeliveryAt)}.`,
    ];
    let y = 114;

    analysis.forEach((item) => {
      document.setFillColor(COLORS.blue);
      document.circle(PAGE.margin + 1.5, y - 1.3, 1, "F");
      this.wrappedText(document, item, PAGE.margin + 6, y, 112, 9, COLORS.ink);
      y += 14;
    });

    document.setFillColor(COLORS.light);
    document.roundedRect(139, 101, 56, 73, 3, 3, "F");
    this.text(document, "SAÚDE DO PROJETO", 146, 113, 8, COLORS.muted, "bold");
    this.text(
      document,
      this.healthLabel(stats.health.status),
      146,
      130,
      15,
      this.healthColor(stats.health.status),
      "bold",
    );
    this.text(document, `${stats.health.score}/100`, 146, 145, 20, COLORS.ink, "bold");
    this.wrappedText(document, stats.health.reason, 146, 157, 42, 7, COLORS.muted);

    this.text(document, "DADOS DO PROJETO", PAGE.margin, 198, 9, COLORS.blue, "bold");
    this.table(document, 205, [
      { label: "Status", width: 36 },
      { label: "Início", width: 36 },
      { label: "Prazo", width: 36 },
      { label: "Data de corte", width: 72 },
    ], [[
      stats.project.stage,
      this.date(stats.project.startedAt),
      this.date(stats.project.deadline),
      this.dateTime(stats.cutoffAt),
    ]]);
  }

  private evolution(document: jsPDF, source: ProjectStatsReportSource): void {
    const { stats, historicalSnapshots } = source;

    this.sectionPage(
      document,
      "2. Evolução do projeto",
      "Progresso e saúde observados nos períodos persistidos.",
    );
    const snapshots = historicalSnapshots.slice(-12);
    const rows = snapshots.length > 0
      ? snapshots.map((snapshot) => [
        `${this.date(snapshot.period_start)} a ${this.date(snapshot.period_end)}`,
        `${snapshot.summary_json.progress}%`,
        `${snapshot.health_score}/100`,
        this.healthLabel(snapshot.health_status),
      ])
      : [[
        this.periodName(source.periodType),
        `${stats.summary.progress}%`,
        `${stats.health.score}/100`,
        this.healthLabel(stats.health.status),
      ]];

    this.table(document, 50, [
      { label: "Período", width: 70 },
      { label: "Progresso", width: 35, align: "center" },
      { label: "Saúde", width: 35, align: "center" },
      { label: "Classificação", width: 40, align: "center" },
    ], rows);

    const y = Math.min(220, 65 + (rows.length * 11));
    document.setFillColor(COLORS.light);
    document.roundedRect(PAGE.margin, y, CONTENT_WIDTH, 42, 3, 3, "F");
    this.text(document, "LEITURA GERENCIAL", 21, y + 12, 9, COLORS.blue, "bold");
    this.wrappedText(
      document,
      `O projeto está com ${stats.summary.progress}% de progresso e saúde ${this.healthLabel(stats.health.status).toLowerCase()}. ${stats.health.reason}`,
      21,
      y + 23,
      CONTENT_WIDTH - 12,
      9,
      COLORS.ink,
    );
  }

  private members(document: jsPDF, source: ProjectStatsReportSource): void {
    const { stats } = source;

    this.sectionPage(
      document,
      "3. Desempenho dos membros",
      "Produtividade, situação e tarefas atribuídas à equipe.",
    );
    const productivity = new Map(
      stats.productivity.map((item) => [item.memberId, item]),
    );
    const memberRows = stats.members.slice(0, 10).map((member) => {
      const performance = stats.performancePerMember.find(
        (item) => item.memberId === member.memberId,
      );

      return [
        member.user.name,
        String(member.completedTasks),
        String(member.startedTasks),
        String(member.reviewTasks),
        String(member.delayedTasks),
        `${performance?.averageHoursPerMonth ?? 0} h`,
        String(productivity.get(member.memberId)?.ratio ?? 0),
      ];
    });

    this.table(document, 50, [
      { label: "Membro", width: 52 },
      { label: "Concl.", width: 21, align: "center" },
      { label: "Inic.", width: 20, align: "center" },
      { label: "Rev.", width: 19, align: "center" },
      { label: "Atras.", width: 21, align: "center" },
      { label: "Média/mês", width: 28, align: "right" },
      { label: "Índice", width: 19, align: "right" },
    ], memberRows.length > 0 ? memberRows : [["Nenhum membro", "—", "—", "—", "—", "—", "—"]]);

    let y = 68 + (Math.max(memberRows.length, 1) * 11);
    this.text(document, "TAREFAS POR MEMBRO", PAGE.margin, y, 9, COLORS.blue, "bold");
    y += 8;

    for (const member of stats.members) {
      if (y > 238) {
        this.sectionPage(document, "3. Desempenho dos membros", "Continuação das tarefas.");
        y = 50;
      }

      document.setFillColor(COLORS.light);
      document.rect(PAGE.margin, y, CONTENT_WIDTH, 9, "F");
      this.text(document, member.user.name, PAGE.margin + 3, y + 6, 8, COLORS.ink, "bold");
      y += 11;

      const tasks = member.tasks.length > 0
        ? member.tasks.map((task) => [
          task.code,
          task.name,
          task.delayed ? "ATRASADA" : task.stage,
          this.duration(task.spentMinutes),
          this.date(task.deadline),
        ])
        : [["—", "Nenhuma tarefa atribuída", "—", "0h 00min", "—"]];
      this.table(document, y, [
        { label: "Código", width: 25 },
        { label: "Tarefa", width: 75 },
        { label: "Status", width: 32 },
        { label: "Tempo", width: 25, align: "right" },
        { label: "Prazo", width: 23, align: "right" },
      ], tasks.slice(0, 10), 9);
      y += 11 + (Math.min(tasks.length, 10) * 9);
    }
  }

  private agendaAndHealth(document: jsPDF, source: ProjectStatsReportSource): void {
    const { stats } = source;

    this.sectionPage(
      document,
      "4. Agenda, saúde e recomendações",
      "Eventos, riscos e ações gerenciais recomendadas.",
    );
    this.text(document, "PRÓXIMOS EVENTOS", PAGE.margin, 50, 9, COLORS.blue, "bold");
    const cutoff = this.asDate(stats.cutoffAt).getTime();
    const events = stats.events
      .filter((event) => this.asDate(event.date).getTime() >= cutoff)
      .slice(0, 6);
    const eventRows = events.length > 0
      ? events.map((event) => [
        this.dateTime(event.date),
        event.title,
        event.category,
      ])
      : [["—", "Nenhum evento futuro cadastrado", "—"]];

    this.table(document, 57, [
      { label: "Data", width: 48 },
      { label: "Evento", width: 92 },
      { label: "Categoria", width: 40 },
    ], eventRows);

    const healthY = 77 + (eventRows.length * 11);
    document.setFillColor(COLORS.light);
    document.roundedRect(PAGE.margin, healthY, CONTENT_WIDTH, 38, 3, 3, "F");
    this.text(document, "SAÚDE DO PROJETO", 21, healthY + 11, 8, COLORS.muted, "bold");
    this.text(
      document,
      `${this.healthLabel(stats.health.status)}  •  ${stats.health.score}/100`,
      21,
      healthY + 24,
      15,
      this.healthColor(stats.health.status),
      "bold",
    );
    this.wrappedText(document, stats.health.reason, 112, healthY + 13, 74, 9, COLORS.ink);

    const recommendationY = healthY + 54;
    this.text(
      document,
      "RECOMENDAÇÕES GERENCIAIS",
      PAGE.margin,
      recommendationY,
      9,
      COLORS.blue,
      "bold",
    );
    const recommendations = [
      "Recuperar primeiro as tarefas atrasadas que bloqueiam entregas.",
      "Revisar o score, o motivo e a projeção a cada snapshot.",
      "Consolidar apontamentos de tempo para representar o esforço real.",
      "Manter relatórios com data de corte para comparação histórica.",
    ];
    let y = recommendationY + 12;

    recommendations.forEach((recommendation, index) => {
      document.setFillColor(COLORS.blue);
      document.circle(PAGE.margin + 4, y - 2, 4, "F");
      this.text(document, String(index + 1), PAGE.margin + 2.6, y - 0.5, 8, COLORS.white, "bold");
      this.wrappedText(document, recommendation, PAGE.margin + 12, y, 164, 9, COLORS.ink);
      y += 18;
    });

    this.wrappedText(
      document,
      `Rastreabilidade: periodType=${source.periodType} • cutoffAt=${this.asDate(stats.cutoffAt).toISOString()} • reportId=${source.reportId}`,
      PAGE.margin,
      275,
      CONTENT_WIDTH,
      6,
      COLORS.muted,
    );
  }

  private sectionPage(document: jsPDF, title: string, subtitle: string): void {
    document.addPage();
    document.setFillColor(COLORS.blue);
    document.rect(0, 0, PAGE.width, 3, "F");
    this.text(document, "Tasker", PAGE.margin, 16, 13, COLORS.blue, "bold");
    this.text(document, "RELATÓRIO DE DESEMPENHO", 137, 16, 7, COLORS.muted, "bold");
    this.line(document, 23);
    this.text(document, title, PAGE.margin, 34, 18, COLORS.ink, "bold");
    this.text(document, subtitle, PAGE.margin, 41, 8, COLORS.muted);
  }

  private table(
    document: jsPDF,
    y: number,
    columns: TableColumn[],
    rows: string[][],
    rowHeight = 11,
  ): void {
    document.setFillColor(COLORS.light);
    document.rect(PAGE.margin, y, CONTENT_WIDTH, rowHeight, "F");
    let x = PAGE.margin;

    columns.forEach((column) => {
      this.cellText(document, column.label, x, y + 7, column, 7, COLORS.muted, "bold");
      x += column.width;
    });

    rows.forEach((row, rowIndex) => {
      const rowY = y + rowHeight + (rowIndex * rowHeight);
      document.setDrawColor(COLORS.line);
      document.line(PAGE.margin, rowY + rowHeight, PAGE.width - PAGE.margin, rowY + rowHeight);
      x = PAGE.margin;
      columns.forEach((column, columnIndex) => {
        this.cellText(
          document,
          String(row[columnIndex] ?? "—"),
          x,
          rowY + 7,
          column,
          7,
          COLORS.ink,
        );
        x += column.width;
      });
    });
  }

  private cellText(
    document: jsPDF,
    value: string,
    x: number,
    y: number,
    column: TableColumn,
    size: number,
    color: string,
    style: "normal" | "bold" = "normal",
  ): void {
    const padding = 2;
    const align = column.align ?? "left";
    const textX = align === "right"
      ? x + column.width - padding
      : align === "center"
        ? x + (column.width / 2)
        : x + padding;

    document.setFont("helvetica", style);
    document.setFontSize(size);
    document.setTextColor(color);
    document.text(
      document.splitTextToSize(value, column.width - (padding * 2))[0] ?? "",
      textX,
      y,
      { align },
    );
  }

  private addFooters(document: jsPDF, source: ProjectStatsReportSource): void {
    const pages = document.getNumberOfPages();

    for (let page = 1; page <= pages; page += 1) {
      document.setPage(page);
      this.line(document, 286);
      this.text(document, `Tasker • ${source.stats.project.title}`, PAGE.margin, 291, 6, COLORS.muted);
      this.text(document, `Página ${page} de ${pages}`, 195, 291, 6, COLORS.muted, "normal", "right");
    }
  }

  private text(
    document: jsPDF,
    value: string,
    x: number,
    y: number,
    size: number,
    color: string,
    style: "normal" | "bold" = "normal",
    align: "left" | "center" | "right" = "left",
  ): void {
    document.setFont("helvetica", style);
    document.setFontSize(size);
    document.setTextColor(color);
    document.text(value, x, y, { align });
  }

  private wrappedText(
    document: jsPDF,
    value: string,
    x: number,
    y: number,
    width: number,
    size: number,
    color: string,
  ): void {
    document.setFont("helvetica", "normal");
    document.setFontSize(size);
    document.setTextColor(color);
    document.text(document.splitTextToSize(value, width), x, y);
  }

  private line(document: jsPDF, y: number): void {
    document.setDrawColor(COLORS.line);
    document.line(PAGE.margin, y, PAGE.width - PAGE.margin, y);
  }

  private healthLabel(status: string): string {
    return {
      SAFE: "SAUDÁVEL",
      WARNING: "ATENÇÃO",
      CRITICAL: "CRÍTICO",
    }[status] ?? status;
  }

  private healthColor(status: string): string {
    return {
      SAFE: COLORS.green,
      WARNING: COLORS.amber,
      CRITICAL: COLORS.red,
    }[status] ?? COLORS.muted;
  }

  private periodName(period: StatsPeriodType): string {
    return {
      WEEK: "Semana atual",
      MONTH: "Mês atual",
      QUARTER: "Trimestre atual",
    }[period];
  }

  private duration(minutes: number): string {
    return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}min`;
  }

  private date(value: Date | string | null): string {
    if (!value) {
      return "Não informado";
    }

    const date = this.asDate(value);

    return Number.isNaN(date.getTime())
      ? "Não informado"
      : new Intl.DateTimeFormat("pt-BR").format(date);
  }

  private dateTime(value: Date | string): string {
    const date = this.asDate(value);

    return Number.isNaN(date.getTime())
      ? "Não informado"
      : new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
  }

  private asDate(value: Date | string): Date {
    return value instanceof Date ? value : new Date(value);
  }
}
