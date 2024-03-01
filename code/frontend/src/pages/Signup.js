import { useField } from '../hooks/useField';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const username = useField('username');
  const email = useField('email');
  const password = useField('password');
  const date_of_birth = useField('date_of_birth');
  const phone_number = useField('phone_number');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username.value, email.value, password.value, date_of_birth.value, phone_number.value); // make necessary modification
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input {...username} />
      <label>Email address:</label>
      <input {...email} />
      <label>Password:</label>
      <input {...password} />
      <label>Date of Birth:</label>
      <input type="date" value={date_of_birth.value} onChange={date_of_birth.onChange} />
      <label>Phone Number:</label>
      <input {...phone_number} />
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;