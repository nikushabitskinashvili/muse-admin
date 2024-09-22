import { Props } from '@/app/interface/props.interface';
import { Button } from '../Buttons/Buttons';
import styles from './BlockAccount.module.scss';
;

 const BlockAccount = (props: Props) => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.texts}>
                    <h2 className={styles.text}>Block this acount ?</h2>
                    <p>are you sure you want to block this account?</p>
                </div>
                <div className={styles.buttons}>
                <Button bg={''} title={"Cancle"} size={'normal'}/>
                <Button bg={'pink'} title={"Block"} size={'normal'}/>
                </div>
                
            </form>
        </div>
    )
}

export default BlockAccount;