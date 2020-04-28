import { DefaultState, DefaultCustom, Context as NicoContext, Next as NicoNext } from '@blastz/nico/typings';
import bad from '../api/responses/bad';
import unAuth from '../api/responses/unAuth';
import { Config as NicoConfig } from '@blastz/nico/typings';

interface State extends DefaultState {
  user: {
    id: string;
  };
}

interface Custom extends DefaultCustom {
  bad: typeof bad;
  unAuth: typeof unAuth;
  custom: ConfigCustom;
}

interface ConfigCustom {
  JWT_SECRET: string;
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

interface Context extends NicoContext<State, Custom> {}

interface Next extends NicoNext {}
