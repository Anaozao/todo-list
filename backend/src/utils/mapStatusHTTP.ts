/* eslint-disable @typescript-eslint/naming-convention */
export const http = {
  BAD_REQUEST: 400,
  SUCCESSFUL: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  INVALID_VALUE: 409,
  NOT_FOUND: 404,
};

export const mapStatusHTTP = (status: keyof typeof http) => http[status] || 500;
