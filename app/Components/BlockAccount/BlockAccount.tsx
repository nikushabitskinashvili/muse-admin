import { User } from '@/app/interface/props.interface';
import { Button } from '../Buttons/Buttons';
import styles from './BlockAccount.module.scss';
import { useState } from 'react';
import BaseApi from '@/app/api/baseApi';

const BlockAccount = (props: User) => {
  const [blocked, setBlocked] = useState(props.blocked);


  const handleBlockUser = async () => {
    const newBlockState = blocked;
    console.log(newBlockState, "newBlockState");

    const apiEndpoint = newBlockState ? `/user/block/${props.id}` : `/user/unblock/${props.id}`;

    console.log(apiEndpoint, "apiEndpoint" );

    try {
      const response = await BaseApi.patch(apiEndpoint);

        setBlocked(newBlockState);

    } catch (error) {
      throw new Error(`Could not ${newBlockState ? 'block' : 'unblock'} user!`);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.texts}>
          <h2 className={styles.text}>
            {blocked ? 'Unblock this account?' : 'Block this account?'}
          </h2>
          <p>
            Are you sure you want to {blocked ? 'unblock' : 'block'} this account?
          </p>
        </div>
        <div className={styles.buttons}>
          <Button
            bg={''}
            title={"Cancel"}
            size={'normal'}
            onClick={props.onClose}
          />
          <Button
            bg={'pink'}
            title={blocked ? 'Unblock' : 'Block'}
            size={'normal'}
            onClick={handleBlockUser}
          />
        </div>
      </form>
    </div>
  );
};

export default BlockAccount;
