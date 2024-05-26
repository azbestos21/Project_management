import React from 'react';

const MyComponent = () => {

  const handleActionAndRefresh = async () => {
    try {
      // Perform your action here (e.g., API call)
      // await someAsyncAction();

      // Display a success message or perform additional logic
      alert('Action performed successfully!');

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error performing the action:', error);
      // Display an error message if needed
    }
  };

  return (
    <div>
      <button onClick={handleActionAndRefresh}>Perform Action and Refresh</button>
    </div>
  );
};

export default MyComponent;
