interface RegisterBody {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export type { RegisterBody, LoginBody };
