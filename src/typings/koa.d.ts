import { DefaultState, DefaultCustom } from '@blastz/nico/typings';
import bad from '../api/responses/bad';
import unAuth from '../api/responses/unAuth';
import { Config as NicoConfig } from '@blastz/nico/typings';

interface State extends DefaultState {
  user: {
    id: string;
  };
  custom: ConfigCustom;
}

interface Custom extends DefaultCustom {
  bad: typeof bad;
  unAuth: typeof unAuth;
}

interface ConfigCustom {
  APP_NAME: string;
}

interface ConfigDatastores {
  default: {
    url: string;
  };
  cache?: {
    url: string;
  };
}

interface Config extends NicoConfig<State, Custom> {
  datastores: ConfigDatastores;
  port?: number;
}
