import { Interval } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { Action } from './actions/action.interface';
import { SimulationActions } from './simulacao.types';
import { IncluirServicoAction } from './actions/incluir-servico.action';
import { ModificarAgendaAction } from './actions/modificar-agenda.action';
import { ModificarServicoAction } from './actions/modificar-servico.action';
import { randomNumberInclusive } from 'src/common/utils/random-number-inclusive.utils';

@Injectable()
export class SimulacaoService {
  constructor(
    private readonly incluirServicoAction: IncluirServicoAction,
    private readonly modificarAgendaAction: ModificarAgendaAction,
    private readonly modificarServicoAction: ModificarServicoAction,
  ) {}

  @Interval(10000)
  initAction() {
    this.executeAction();
  }

  private executeAction() {
    const chosenAction = this.choiceAction();
    const action = this.getAction(chosenAction);
    action?.execute();
  }

  private choiceAction() {
    const actionNumber = randomNumberInclusive(0, 100);
    if (actionNumber > 70) {
      return SimulationActions.INCLUIR_SERVICO;
    }
    if (actionNumber > 40) {
      return SimulationActions.MODIFICAR_AGENDA;
    }
    if (actionNumber > 15) {
      return SimulationActions.MODIFICAR_SERVICO;
    }
    return SimulationActions.AGUARDAR;
  }

  private getAction(action: SimulationActions): Action {
    switch (action) {
      case SimulationActions.INCLUIR_SERVICO:
        return this.incluirServicoAction;
      case SimulationActions.MODIFICAR_AGENDA:
        return this.modificarAgendaAction;
      case SimulationActions.MODIFICAR_SERVICO:
        return this.modificarServicoAction;
      default:
        return null;
    }
  }
}
