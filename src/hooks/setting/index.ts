import type { GlobConfig } from '/#/config';

import { warn } from '/@/utils/log';
import { getAppEnvConfig } from '/@/utils/env';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_CLIENT_ID,
    VITE_GLOB_CLIENT_SECRET,
    VITE_GLOB_MULTI_TENANT_TYPE,
    VITE_GLOB_SHOW_CAPTCHA,
    VITE_GLOB_TIPS,
  } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
    clientId: VITE_GLOB_CLIENT_ID,
    clientSecret: VITE_GLOB_CLIENT_SECRET,
    multiTenantType: VITE_GLOB_MULTI_TENANT_TYPE,
    showCaptcha: VITE_GLOB_SHOW_CAPTCHA,
    tips: VITE_GLOB_TIPS,
  };
  return glob as Readonly<GlobConfig>;
};
