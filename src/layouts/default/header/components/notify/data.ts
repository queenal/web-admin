import { MsgPageResult } from '/@/api/ec/resources/model/msgModel';
import { PageResult } from '/@/api/model/baseModel';

export interface ListItem {
  id: string;
  avatar: string;
  // 通知的标题内容
  title: string;
  // 是否在标题上显示删除线
  titleDelete?: boolean;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  data: PageResult<MsgPageResult>;
}
