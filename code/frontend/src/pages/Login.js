import { useField } from '../hooks/useField';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const username = useField('username');
  const password = useField('password');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username.value, password.value);
  };

   return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Username:</label>
      <input {...username} />
      <label>Password:</label>
      <input {...password} />
      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;