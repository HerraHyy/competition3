import { useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const GoalDetails = ({ goal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteGoal = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/goals/${goal.id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }
      response.json("Goal deleted successfully");
      // Handle success, e.g., show a success message or update the UI
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/goals/${goal.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch goal");
        }
        const data = await response.json();
        // Handle the fetched goal data, e.g., update the UI

        

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [goal.id]);

  return (
    <div className="goal-details">
      <h4>{goal.text}</h4>
      <p>
        Created: {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}
        <br />
        Due Date: {formatDistanceToNow(new Date(goal.dueDate), { addSuffix: true })}
        <br />
        Priority: {goal.priority}
      </p>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {error ? (
            <span>Error: {error}</span>
          ) : (
            <button onClick={deleteGoal}>Delete</button>
          )}
        </>
      )}
    </div>
  );
};

export default GoalDetails;
