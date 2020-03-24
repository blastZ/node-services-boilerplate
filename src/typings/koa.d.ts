interface State {
  user: {
    id: string;
  };
  custom: ConfigCustom;
  query: object;
  params: object;
  body: object;
}

interface Custom {
  ok(data?: any, message?: string, success?: boolean): void;
  bad(message?: string): void;
  unAuth(message?: string): void;
  params: object;
  _matchedRoute: string | RegExp | undefined;
  _matchedRouteName: string | undefined;
}

type HttpMethod = 'post' | 'get' | 'delete' | 'put' | 'patch';
