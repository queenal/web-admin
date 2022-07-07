import { Enum } from '/@/api/model/baseModel';

export interface AttachmentPageQuery {
  bizType?: string;
  fileType?: Enum;
  storageType?: Enum;
  bucket?: string;
  path?: string;
  url?: string;
  uniqueFileName?: string;
  fileMd5?: string;
  originalFileName?: string;
  contentType?: string;
  suffix?: string;
  size?: string;
}

export interface Attachment {
  bizType?: string;
  fileType?: Enum;
  storageType?: Enum;
  bucket?: string;
  path?: string;
  url?: string;
  uniqueFileName?: string;
  fileMd5?: string;
  originalFileName?: string;
  contentType?: string;
  suffix?: string;
  size?: string;
  id?: string;
  createTime?: string;
  createdBy?: string;
  updateTime?: string;
  updatedBy?: string;
  echoMap?: Recordable;
}
