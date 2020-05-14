import { Action } from './action.interface';
import { Injectable } from '@nestjs/common';
import { AgendamentoServico } from 'src/modules/agendamento/agendamento.types';
import { AgendamentoService } from 'src/modules/agendamento/agendamento.service';
import { randomNumberInclusive } from 'src/common/utils/random-number-inclusive.utils';

@Injectable()
export class ModificarServicoAction implements Action {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  async execute() {
    const { data } = await this.agendamentoService.getServicosPendentes();
    if (data.length) {
      const servico = data[randomNumberInclusive(0, data.length - 1)];
      this.agendarServico(servico);
    }
  }

  private async agendarServico(servico: AgendamentoServico) {
    const agenda = await this.agendamentoService.agendarServico({
      id_servico: servico.id,
      periodo: randomNumberInclusive(1, 3),
    });
    console.log(`Serviço Agendado -> ${agenda.id_servico}`);
  }
}
