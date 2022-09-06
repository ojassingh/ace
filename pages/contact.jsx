import Navi from '../components/Navi';
import styles from '../styles/Contact.module.scss'

const contact = () => {
    return(<div className={styles.container}>
        <Navi/>
        <div>
            <h1>Contact Us</h1>
        </div>
    </div>);
}   

export default contact;