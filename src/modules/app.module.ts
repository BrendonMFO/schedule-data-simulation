import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SimulacaoModule } from './simulacao/simulacao.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [
    SimulacaoModule,
    AppConfigModule,
    AgendamentoModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
