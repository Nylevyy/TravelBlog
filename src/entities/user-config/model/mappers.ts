import { UserApplicationConfig } from './types';
import { UserApplicationConfigDto } from '../api';

export const mapUserAppConfigResponseToModel = (
  responseConfig: UserApplicationConfigDto,
): UserApplicationConfig => ({
  id: responseConfig.id,
  blog: responseConfig.blogConfig,
});
