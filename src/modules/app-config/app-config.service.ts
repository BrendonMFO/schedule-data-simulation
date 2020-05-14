import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(protected readonly configService: ConfigService) {}

  get agendamentoConfig() {
    return {
      url: this.configService.get<string>('AGENDAMENTO_URL'),
      login: this.configService.get<string>('AGENDAMENTO_LOGIN'),
      password: this.configService.get<string>('AGENDAMENTO_PASSWORD'),
    };
  }
}
