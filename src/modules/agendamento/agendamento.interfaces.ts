export interface AgendamentoCreateServicoParams {
  readonly nome: string;
  readonly cpf_cnpj: string;
  readonly telefone: string;
  readonly id_tipo_servico_cidade: number;
}

export interface AgendamentoAgendaServicoParams {
  readonly periodo: number;
  readonly id_servico: number;
}

export interface AgendamentoReagendarAgendaParams {
  readonly id_agenda: number;
  readonly periodo: number;
  readonly id_servico: number;
}
