import useApiInterceptor from './intercerptor';

function AuthService() {
  const api = useApiInterceptor();
  async function login(payload:object) {
    return api.post("/auth/login", payload);
  }


  return { login };
}

export default AuthService;