import React from 'react';
import { useFormContext } from 'react-hook-form';

const AddArtistsModule: React.FC = () => {
  const { register } = useFormContext(); 

  return (
    <div>
      <input
        type="text"
        {...register('name', { required: true })}
        placeholder="Artist Name"
      />
      <textarea
        {...register('biography', { required: true })}
        placeholder="Artist Description"
      />
      <input
        type="file"
        {...register('image')}
      />
    </div>
  );
};

export default AddArtistsModule;
