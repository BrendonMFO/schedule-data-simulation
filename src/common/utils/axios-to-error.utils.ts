import {
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';

export const axiosToError = (error: {
  response: { data: unknown };
  message: string;
  request: unknown;
}) => {
  if (error.response) {
    return new BadGatewayException(error.response.data, error.message);
  } else if (error.request) {
    return new BadGatewayException(`Service Unavailable`);
  } else {
    return new InternalServerErrorException(error.message);
  }
};
