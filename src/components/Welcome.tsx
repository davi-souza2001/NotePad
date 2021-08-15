import React from 'react';
import useAuth from '../data/hook/useAuth';
import styles from "../styles/Welcome.module.css";


export default function Welcome() {

    const { user, loginGoogle } = useAuth();

    return (
            <div className={styles.content}>
                <div className={styles.text}>
                    <h2 className={styles.title}>Seja bem vindo ao Note Pad !</h2>
                    <h4 className={styles.subTitle}>Aqui você pode anotar suas principais atividades ou lembretes do dia a dia sem se preocupar em perdelas, pois oferecemos:  </h4>
                    <ul className={styles.list}>
                        <li>Conta personalizada no seu email;</li>
                        <li>Facilidade no acesso, sem se preocupar em esquecer senha;</li>
                        <li>Anotações de forma rápida e eficaz</li>
                    </ul>
                    <h4>Clique aqui para criar sua <div className={styles.word} onClick={loginGoogle}>conta !</div></h4>
                </div>
            </div>
    )
}

