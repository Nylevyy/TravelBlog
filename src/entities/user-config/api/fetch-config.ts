import { Api } from '~/shared/api';
import { USER_CONFIG_PATH } from './constants';
import { FetchConfigResponse } from './types';

export const fetchConfig = async (): Promise<
  FetchConfigResponse['applicationConfig']
> => {
  const { data } = await Api.get<null, FetchConfigResponse>({
    url: USER_CONFIG_PATH,
  });
  return data.applicationConfig;
};
