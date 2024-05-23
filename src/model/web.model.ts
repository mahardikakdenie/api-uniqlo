export interface I_META {
  status: boolean | string | number;
  message: string;
  code: string | number;
}

export class I_WEBRESPONSE<data, meta> {
  meta: meta;
  data: data;
}
