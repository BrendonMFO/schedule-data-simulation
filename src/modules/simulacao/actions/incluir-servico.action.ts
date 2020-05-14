import {
  SERVICOS_PENDENTES_KEY,
  AgendamentoTipoServicoCidade,
} from 'src/modules/agendamento/agendamento.types';
import * as faker from 'faker-br';
import { Action } from './action.interface';
import { Injectable, Inject } from '@nestjs/common';
import { AgendamentoService } from 'src/modules/agendamento/agendamento.service';
import { randomNumberInclusive } from 'src/common/utils/random-number-inclusive.utils';
import { AgendamentoCreateServicoParams } from 'src/modules/agendamento/agendamento.interfaces';

@Injectable()
export class IncluirServicoAction implements Action {
  constructor(
    @Inject(SERVICOS_PENDENTES_KEY)
    private readonly tiposServicosCidade: AgendamentoTipoServicoCidade[],
    private readonly agendamentoService: AgendamentoService,
  ) {}

  async execute() {
    const data = this.generateData();
    const servico = await this.agendamentoService.createServico(data);
    console.log(`Novo servico -> ${servico.id}`);
  }

  private generateData(): AgendamentoCreateServicoParams {
    const count = this.tiposServicosCidade.length - 1;
    const index = randomNumberInclusive(0, count);
    return {
      cpf_cnpj: faker.br.cpf(),
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      telefone: `99999999999`,
      id_tipo_servico_cidade: this.tiposServicosCidade[index].id,
    };
  }
}
