"use client";
import React, { ReactNode } from 'react';
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form';
import styles from './ReusableModal.module.scss';
import { Button } from '../Buttons/Buttons';
import CloseButton from '../CloseButton/CloseButton';
import axios from 'axios';

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FieldValues) => void; 
  children: ReactNode;
  buttonTitle: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  children,
  onSubmit,
  buttonTitle,
}) => {
  const methods = useForm<FieldValues>();  

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data:any) => {    

    console.log(data)

  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.modalForm}>
                <div className={styles.modalFormTxt}>
                  <h2 className={styles.text}>New Artist</h2>
                  <CloseButton bg={true} onClick={onClose} />
                </div>
                <div className={styles.modalFormWrapper}>
                  <div className={styles.formWrapper}>
                    {children}
                    <div className={styles.btn}>
                      <Button bg={'pink'} title={buttonTitle} size={'huge'} type="submit" />
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default ReusableModal;
