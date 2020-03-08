interface State {
  user: {
    id: string;
  };
  custom: ConfigCustom;
}

interface Custom {
  ok(data?: any, message?: string, success?: boolean): void;
  bad(message?: string): void;
  unAuth(message?: string): void;
}

type HttpMethod = 'post' | 'get' | 'delete' | 'put' | 'patch';
