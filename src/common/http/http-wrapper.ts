import { Observable } from 'rxjs';
import { HttpService, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { axiosToError } from '../utils/axios-to-error.utils';
import { ClassType } from 'class-transformer/ClassTransformer';
import { HttpWrapperRequestConfig } from './http-wrapper.types';

type Unarray<T> = T extends Array<infer U> ? U : T;

@Injectable()
export abstract class HttpWrapper {
  constructor(protected readonly httpService: HttpService) {}

  protected abstract getBaseUrl(): string;

  protected abstract getRequestConfig(): Promise<HttpWrapperRequestConfig>;

  async get<T>(
    route: string,
    fnCastType?: () => ClassType<Unarray<T>>,
  ): Promise<T> {
    const config = await this.getRequestConfig();
    const url = `${this.getBaseUrl()}/${route}`;
    const request = this.httpService.get<T>(url, config);
    const { data } = await this.dispatchRequest(request);
    return this.checkCastReturn(data, fnCastType);
  }

  async post<T>(
    route: string,
    dataReq: unknown,
    fnCastType?: () => ClassType<Unarray<T>>,
  ) {
    const config = await this.getRequestConfig();
    const request = this.httpService.post<T>(
      `${this.getBaseUrl()}/${route}`,
      dataReq,
      config,
    );
    const { data } = await this.dispatchRequest(request);
    return this.checkCastReturn(data, fnCastType);
  }

  async delete<T>(
    route: string,
    fnCastType?: () => ClassType<Unarray<T>>,
  ): Promise<T> {
    const config = await this.getRequestConfig();
    const url = `${this.getBaseUrl()}/${route}`;
    const request = this.httpService.delete<T>(url, config);
    const { data } = await this.dispatchRequest(request);
    return this.checkCastReturn(data, fnCastType);
  }

  async patch<T>(
    route: string,
    dataReq: unknown,
    fnCastType?: () => ClassType<Unarray<T>>,
  ) {
    const config = await this.getRequestConfig();
    const request = this.httpService.patch<T>(
      `${this.getBaseUrl()}/${route}`,
      dataReq,
      config,
    );
    const { data } = await this.dispatchRequest(request);
    return this.checkCastReturn(data, fnCastType);
  }

  protected checkCastReturn<T>(
    data: T,
    fnCastType?: () => ClassType<Unarray<T>>,
  ): T {
    return !fnCastType ? data : (plainToClass(fnCastType(), data) as T);
  }

  private async dispatchRequest<T>(request: Observable<T>) {
    try {
      return await request.toPromise();
    } catch (error) {
      throw axiosToError(error);
    }
  }
}
