export interface BlockListPageQuery {
  ip: string;
  requestUri: string;
  requestMethod: string;
  limitStart: string;
  limitEnd: string;
  state: boolean;
}

export interface BlockListSaveDTO {
  ip: string;
  requestUri: string;
  requestMethod: string;
  limitStart: string;
  limitEnd: string;
  state: boolean;
}

export interface BlockListUpdateDTO {
  id: string;
  ip: string;
  requestUri: string;
  requestMethod: string;
  limitStart: string;
  limitEnd: string;
  state: boolean;
}

export interface BlockList {
  ip?: string;
  requestUri?: string;
  requestMethod?: string;
  limitStart?: string;
  limitEnd?: string;
  state?: boolean;
  id?: string;
  createTime?: string;
  createdBy?: string;
  updateTime?: string;
  updatedBy?: string;
  echoMap?: Recordable;
}
