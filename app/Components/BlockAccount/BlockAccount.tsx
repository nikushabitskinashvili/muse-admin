import { Props } from '@/app/interface/props.interface';
import { Button } from '../Buttons/Buttons';
import styles from './BlockAccount.module.scss';
import axios from 'axios';

const BlockAccount = (props: Props) => {
  const handleBlockUser = async () => {
    try {
      await axios.patch(
        `https://back.museappofficial.com/user/${props.id}`, 
        { blocked: true }, 
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImJsb2NrZWQiOmZhbHNlLCJpYXQiOjE3Mjc2OTg1MTJ9.9iG6XQStR_mZpKtsySoDguNKWVBik4PKDFZuJ-dWZjQ', 
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      alert('Could not block user!');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.texts}>
          <h2 className={styles.text}>Block this account?</h2>
          <p>Are you sure you want to block this account?</p>
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
            title={"Block"}
            size={'normal'}
            onClick={handleBlockUser}
          />
        </div>
      </form>
    </div>
  );
};

export default BlockAccount;
