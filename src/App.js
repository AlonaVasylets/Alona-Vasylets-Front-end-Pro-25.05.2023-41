import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Email is not valid'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\d{12}$/, 'The phone number must consist of 12 digits'),
});

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

 const onSubmit = (data) => {
    const newData = {...data, name: data.name.replace(/\s+/g, ' ').trim()};
    console.log(newData);
    reset();
  }

  return (
    <div className="App">
      <form className='container' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type='text' name='name' {...register('name')} />
          {errors.name && (
            <p className='errMsg'>{errors.name.message}</p>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input type='text' name='email' {...register('email')} />
          {errors.email && (
            <p className='errMsg'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Phone:</label>
          <input type='text' name='phone' {...register('phone')} />
          {errors.phone && (
            <p className='errMsg'>{errors.phone.message}</p>
          )}
        </div>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;
