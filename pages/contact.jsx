import Footer from '../components/Footer';
import Navi from '../components/Navi';
import styles from '../styles/Contact.module.scss'

const contact = () => {
    return(<div>
        <Navi/>
        <div className={styles.container}>
            <h1>Contact Us</h1>
        </div>
        <Footer/>
    </div>);
}   

export default contact;