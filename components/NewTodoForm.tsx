import { useState } from 'react';

const NewTodoForm = () => {
  const [state, updateState] = useState('');

  return (
    <div>
      <form action=''>
        <input type='text' />
      </form>
    </div>
  );
};

export default NewTodoForm;
