export interface ParameterPageQuery {
  key: string;
  value: string;
  name: string;
  describe: string;
  state: boolean;
  readonly: boolean;
}

export interface ParameterSaveDTO {
  key: string;
  value: string;
  name: string;
  describe: string;
  state: boolean;
  readonly: boolean;
}

export interface ParameterUpdateDTO {
  id: string;
  key: string;
  value: string;
  name: string;
  describe: string;
  state: boolean;
  readonly: boolean;
}

export interface Parameter {
  key: string;
  value: string;
  name: string;
  describe: string;
  state: boolean;
  readonly: boolean;
  id: string;
  createdBy: string;
  createTime: string;
  updatedBy: string;
  updateTime: string;
  echoMap: Recordable;
}
