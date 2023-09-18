import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    data.name = data.name.replace(/\s+/g, ' ').trim();
    console.log(data);
    reset();
  }

  return (
    <div className="App">
      <form className='container' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            {...register('name', { required: true })} />
          {errors.name && (
            <p className='errMsg'>Name is required</p>
          )

          }
        </div>
        <div>
          <label>Email:</label>
          <input
            type='text'
            name='email'
            {...register('email', {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })} />
          {errors.email?.type === 'required' && (
            <p className='errMsg'>Email is required</p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className='errMsg'>Email is not valid</p>
          )}
        </div>
        <div>
          <label>Phone:</label>
          <input
            type='text'
            name='phone'
            {...register('phone', {
              required: true,
              pattern: /^[0-9]{12}$/,
            })} />
          {errors.phone?.type === 'required' && (
            <p className='errMsg'>Phone is required</p>
          )}
          {errors.phone?.type === 'pattern' && (
            <p className='errMsg'>The phone number must consist of 12 digits</p>
          )}
        </div>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;
