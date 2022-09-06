import styles from '../styles/ClubInfo.module.scss'

const ClubInfo = () => {
    return(<div className={styles.container}>
        <div className='container'>
            <h1 className={styles.title}>
                Join the fastest {<br/>} growing club at {<br/>}UofT Scarborough.
            </h1>
        </div>
    </div>);
}

export default ClubInfo;