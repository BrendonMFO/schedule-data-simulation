import { object, string } from '@hapi/joi';

export const validationSchema = object({
  AGENDAMENTO_URL: string().required(),
  AGENDAMENTO_LOGIN: string().required(),
  AGENDAMENTO_PASSWORD: string().required(),
});
