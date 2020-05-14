import { Module, HttpModule } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoHttpService } from './agendamento-http.service';

@Module({
  imports: [HttpModule],
  providers: [AgendamentoService, AgendamentoHttpService],
  exports: [AgendamentoService],
})
export class AgendamentoModule {}
