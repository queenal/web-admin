import { Enum } from '/@/api/model/baseModel';

export interface DatasourceConfigPageQuery {
  name: string;
  username: string;
}

export interface DatasourceConfigResult {
  name: string;
  username: string;
  password: string;
  url: string;
  driverClassName: string;
  poolName: string;
  type: Enum;
}

export interface DataSourceProperty {
  poolName: string;
  name: string;
  username: string;
  password: string;
  url: string;
  driverClassName: string;
}

export interface DatasourceConfigSaveDTO {
  name: string;
  username: string;
  password: string;
  url: string;
  driverClassName: string;
}

export interface DatasourceConfigUpdateDTO {
  id: number;
  name: string;
  username: string;
  password: string;
  url: string;
  driverClassName: string;
}

export interface DatasourceConfig {
  id: number;
  name: string;
  username: string;
  password: string;
  url: string;
  driverClassName: string;
  createTime: string;
  createdBy: string;
  updateTime: string;
  updatedBy: string;
}
