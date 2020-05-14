import {
  AgendamentoAgenda,
  AgendamentoServico,
  AgendamentoAgendaStatus,
  AgendamentoAgendasAtivas,
  AgendamentoTipoServicoCidade,
  AgendamentoServicosPendentes,
} from './agendamento.types';
import {
  AgendamentoCreateServicoParams,
  AgendamentoAgendaServicoParams,
  AgendamentoReagendarAgendaParams,
} from './agendamento.interfaces';
import { Injectable } from '@nestjs/common';
import { AgendamentoRoutes } from './agendamento.routes';
import { AgendamentoHttpService } from './agendamento-http.service';

@Injectable()
export class AgendamentoService {
  constructor(
    private readonly agendamentoHttpService: AgendamentoHttpService,
  ) {}

  async getTiposServicosCidade() {
    return this.agendamentoHttpService.get<AgendamentoTipoServicoCidade[]>(
      AgendamentoRoutes.TIPO_SERVICO_CIDADE,
      () => AgendamentoTipoServicoCidade,
    );
  }

  async getServicosPendentes() {
    return this.agendamentoHttpService.get(
      `${AgendamentoRoutes.SERVICO}?filter[]=naoPossuiAgendamento||scope&per_page=10`,
      () => AgendamentoServicosPendentes,
    );
  }

  async getAgendasAtivas() {
    return this.agendamentoHttpService.get(
      `${AgendamentoRoutes.AGENDA}?filter[]=active||scope&per_page=10`,
      () => AgendamentoAgendasAtivas,
    );
  }

  async createServico(params: AgendamentoCreateServicoParams) {
    return this.agendamentoHttpService.post(
      AgendamentoRoutes.SERVICO,
      params,
      () => AgendamentoServico,
    );
  }

  async agendarServico(params: AgendamentoAgendaServicoParams) {
    return this.agendamentoHttpService.post(
      AgendamentoRoutes.AGENDA,
      params,
      () => AgendamentoAgenda,
    );
  }

  async reagendarAgenda(params: AgendamentoReagendarAgendaParams) {
    return this.agendamentoHttpService.post(
      `${AgendamentoRoutes.AGENDA}/${params.id_agenda}/${AgendamentoRoutes.AGENDA_REAGENDAR}`,
      params,
    );
  }

  async concluirAgenda(agendaId: number) {
    return this.agendamentoHttpService.patch(
      `${AgendamentoRoutes.AGENDA}/${agendaId}`,
      { id_agenda_status: AgendamentoAgendaStatus.AGENDA_STATUS_FINALIZADO },
    );
  }

  async cancelarAgenda(agendaId: number) {
    return this.agendamentoHttpService.patch(
      `${AgendamentoRoutes.AGENDA}/${agendaId}`,
      { id_agenda_status: AgendamentoAgendaStatus.AGENDA_STATUS_CANCELADO },
    );
  }
}
