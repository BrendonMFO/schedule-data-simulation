import * as moment from 'moment';
import { plainToClass } from 'class-transformer';
import { AgendamentoLogin } from './agendamento.types';
import { Injectable, HttpService } from '@nestjs/common';
import { AgendamentoRoutes } from './agendamento.routes';
import { HttpWrapper } from 'src/common/http/http-wrapper';
import { AppConfigService } from '../app-config/app-config.service';
import { HttpWrapperRequestConfig } from 'src/common/http/http-wrapper.types';

@Injectable()
export class AgendamentoHttpService extends HttpWrapper {
  private agendamentoLogin: AgendamentoLogin;

  constructor(
    readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
  ) {
    super(httpService);
  }

  protected getBaseUrl() {
    return this.appConfigService.agendamentoConfig.url;
  }

  protected async getRequestConfig(): Promise<HttpWrapperRequestConfig> {
    if (this.checkIfNeedToken()) {
      await this.login();
    }
    return {
      headers: {
        Authorization: `${this.agendamentoLogin.token_type} ${this.agendamentoLogin.access_token}`,
      },
    };
  }

  private async login() {
    const request = this.httpService.post(
      `${this.appConfigService.agendamentoConfig.url}/${AgendamentoRoutes.LOGIN}`,
      {
        login: this.appConfigService.agendamentoConfig.login,
        password: this.appConfigService.agendamentoConfig.password,
      },
    );
    const { data } = await request.toPromise();
    this.agendamentoLogin = plainToClass(AgendamentoLogin, data);
  }

  private checkIfNeedToken() {
    const now = moment();
    const noToken = !this.agendamentoLogin;
    return noToken || this.agendamentoLogin.expires_at.isBefore(now);
  }
}
