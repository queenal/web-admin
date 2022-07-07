import { ModelSelectReqDTO, Model, ModelSaveVO, ModelPublishReqDTO } from './model/modelModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.ACTIVITI + '/model/pageModel',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Delete: {
    url: ServicePrefixEnum.ACTIVITI + '/model/delete',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.ACTIVITI + '/model/save',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Publish: {
    url: ServicePrefixEnum.ACTIVITI + '/model/publish',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<ModelSelectReqDTO>) =>
  defHttp.request<PageResult<Model>>({ ...Api.Page, params });

export const save = (params: ModelSaveVO) =>
  defHttp.request<string>({
    ...Api.Save,
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });

export const publish = (params: ModelPublishReqDTO) =>
  defHttp.request<string>({ ...Api.Publish, params });

export const remove = (modelId: string) =>
  defHttp.request<boolean>({
    ...Api.Delete,
    params: { modelId },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
