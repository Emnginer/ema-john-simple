import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

    const [logInUser, setLogInUser] = useContext(UserContext);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shipment-field">
      <input defaultValue={logInUser.name} {...register("exampleRequired1", { required: true })} placeholder='Name'/>
      {errors.exampleRequired1 && <span className="error">Name is required</span>}

      <input defaultValue={logInUser.email} {...register("exampleRequired2", { required: true })} placeholder='email'/>
      {errors.exampleRequired2 && <span className="error">Email is required</span>}

      <input {...register("exampleRequired3", { required: true })} placeholder='address'/>
      {errors.exampleRequired3 && <span className="error">Address is required</span>}

      <input {...register("exampleRequired4", { required: true })} placeholder='phone'/>
      {errors.exampleRequired4 && <span className="error">Phone is required</span>}
      



      <input type="submit" />
    </form>
  );
};

export default Shipment;