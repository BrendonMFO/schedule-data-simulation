import * as moment from 'moment';
import { Type, Transform } from 'class-transformer';

export class AgendamentoLogin {
  @Type(() => String)
  readonly token_type: string;

  @Type(() => String)
  readonly access_token: string;

  @Transform(value => moment(value))
  readonly expires_at: moment.Moment;
}

export class AgendamentoPerPage {
  readonly to: number;
  readonly from: number;
  readonly path: string;
  readonly total: number;
  readonly per_page: string;
  readonly last_page: number;
  readonly current_page: number;
  readonly last_page_url: string;
  readonly first_page_url: string;
  readonly next_page_url: string | null;
  readonly prev_page_url: string | null;
}

export class AgendamentoTipoServicoCidade {
  @Type(() => Number)
  readonly id: number;

  @Type(() => Number)
  readonly id_cidade: number;

  @Type(() => Number)
  readonly id_tipo_servico: number;

  @Type(() => Number)
  readonly tempo_conclusao_servico: number;
}

export class AgendamentoServico {
  @Type(() => Number)
  readonly id: number;

  @Type(() => Number)
  readonly id_cliente: number;

  @Type(() => Number)
  readonly id_usuario_responsavel: number;

  @Type(() => Number)
  readonly id_tipo_servico_cidade: number;

  @Type(() => Date)
  readonly data_conclusao: Date;
}

export class AgendamentoAgenda {
  readonly id: number;
  readonly id_cidade: number;
  readonly id_servico: number;
  readonly id_tecnico: number;
  readonly id_usuario_responsavel: number;

  @Transform(value => moment(value))
  readonly data_inicio_previsao: moment.Moment;

  @Transform(value => moment(value))
  readonly data_termino_previsao: moment.Moment;
}

export class AgendamentoServicosPendentes extends AgendamentoPerPage {
  @Type(() => AgendamentoServico)
  readonly data: AgendamentoServico[];
}

export class AgendamentoAgendasAtivas extends AgendamentoPerPage {
  @Type(() => AgendamentoAgenda)
  readonly data: AgendamentoAgenda[];
}

export const SERVICOS_PENDENTES_KEY = Symbol('__servicos_pendentes__');

export enum AgendamentoAgendaStatus {
  AGENDA_STATUS_AGUARDANDO_CONFIRMACAO = 1,
  AGENDA_STATUS_CLIENTE_CONFIRMACAO,
  AGENDA_STATUS_FINALIZADO,
  AGENDA_STATUS_CANCELADO,
}
