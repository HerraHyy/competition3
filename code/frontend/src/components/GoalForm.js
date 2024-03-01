import { useState } from 'react';

const GoalForm = () => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [createDate, setCreateDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goal = {
      text,
      dueDate,
      priority,
      createDate,
    };

    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
      });

      if (response.ok) {
        // Goal created successfully
        // You can perform any additional logic here
        console.log('Goal created successfully');
      } else {
        // Handle error response
        console.error('Failed to create goal');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error', error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>

      <label>Text:</label>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <label>Due Date:</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <label>Priority:</label>
      <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
      <label>Create Date:</label>
      <input type="date" value={createDate} onChange={(e) => setCreateDate(e.target.value)} />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default GoalForm;
