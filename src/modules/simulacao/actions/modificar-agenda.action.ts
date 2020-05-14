import { Action } from './action.interface';
import { Injectable } from '@nestjs/common';
import { SimulationAgendaActions } from '../simulacao.types';
import { AgendamentoAgenda } from 'src/modules/agendamento/agendamento.types';
import { AgendamentoService } from 'src/modules/agendamento/agendamento.service';
import { randomNumberInclusive } from 'src/common/utils/random-number-inclusive.utils';

@Injectable()
export class ModificarAgendaAction implements Action {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  async execute() {
    const { data } = await this.agendamentoService.getAgendasAtivas();
    if (data.length) {
      const agenda = data[randomNumberInclusive(0, data.length - 1)];
      await this.initAction(agenda);
    }
  }

  private async initAction(agenda: AgendamentoAgenda) {
    const action = this.choiceAction();
    await this.dispachAction(action, agenda);
  }

  private choiceAction() {
    const actionNumber = randomNumberInclusive(0, 100);
    if (actionNumber > 70) {
      return SimulationAgendaActions.CONCLUIR;
    }
    if (actionNumber > 40) {
      return SimulationAgendaActions.REAGENDAR;
    }
    if (actionNumber > 15) {
      return SimulationAgendaActions.CANCELAR;
    }
    return SimulationAgendaActions.AGUARDAR;
  }

  private async dispachAction(
    action: SimulationAgendaActions,
    agenda: AgendamentoAgenda,
  ) {
    switch (action) {
      case SimulationAgendaActions.CONCLUIR:
        await this.agendamentoService.concluirAgenda(agenda.id);
        console.log(`Agenda Concluida -> ${agenda.id}`);
        break;
      case SimulationAgendaActions.REAGENDAR:
        await this.agendamentoService.reagendarAgenda({
          id_agenda: agenda.id,
          id_servico: agenda.id_servico,
          periodo: randomNumberInclusive(1, 3),
        });
        console.log(`Reagendamento -> ${agenda.id}`);
        break;
      case SimulationAgendaActions.CANCELAR:
        await this.agendamentoService.cancelarAgenda(agenda.id);
        console.log(`Agenda Cancelada -> ${agenda.id}`);
        break;
    }
  }
}
