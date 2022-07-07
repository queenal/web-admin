// 20-菜单 30-视图 40-功能 50-字段 60-数据
export enum ResourceTypeEnum {
  MENU = '20',
  // VIEW = '30',
  // FUNCTION = '40',
  // FIELD = '50',
  DATA = '60',
}

// 数据范围
export enum DataScopeEnum {
  ALL = '01',
  SELF_COMPANY_CHILDREN = '02',
  SELF_COMPANY = '03',
  SELF_DEPT_CHILDREN = '04',
  SELF_DEPT = '05',
  SELF = '06',
  CUSTOM = '07',
}

// 角色类别
export enum RoleCategoryEnum {
  FUNCTION = '10',
  DESKTOP = '20',
  DATA_SCOPE = '30',
}
