import { Module } from '@nestjs/common';
import { SimulacaoService } from './simulacao.service';
import { AgendamentoModule } from '../agendamento/agendamento.module';
import { AgendamentoService } from '../agendamento/agendamento.service';
import { IncluirServicoAction } from './actions/incluir-servico.action';
import { SERVICOS_PENDENTES_KEY } from '../agendamento/agendamento.types';
import { ModificarAgendaAction } from './actions/modificar-agenda.action';
import { ModificarServicoAction } from './actions/modificar-servico.action';

@Module({
  imports: [AgendamentoModule],
  providers: [
    SimulacaoService,
    IncluirServicoAction,
    ModificarAgendaAction,
    ModificarServicoAction,
    {
      inject: [AgendamentoService],
      provide: SERVICOS_PENDENTES_KEY,
      useFactory: async (agendamentoService: AgendamentoService) => {
        return await agendamentoService.getTiposServicosCidade();
      },
    },
  ],
})
export class SimulacaoModule {}
