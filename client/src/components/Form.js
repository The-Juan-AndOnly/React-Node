import React from 'react';

export default ({ cancel, errors, submit, submitButtonText, elements }) => {
  // Prevent form from reloading and calls the submit function from parent component
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }
  // Prevent form from realoding and calls the cancel function from the parent component
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className='pad-bottom'>
          <button className='button' type='submit'>
            {submitButtonText}
          </button>
          <button className='button button-secondary' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className='validation--errors--label'>Validation Errors</h2>
        <div className='validation-errors'>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error.msg}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
