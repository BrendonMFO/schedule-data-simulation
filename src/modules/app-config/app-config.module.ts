import { ConfigModule } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { validationSchema } from './app-config.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
