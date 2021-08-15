import Image from "next/image";
import router from "next/router";
import loadingImg from "../../../public/images/loading.gif";
import useAuth from "../../data/hook/useAuth";
import styles from "../../styles/ForceAuthentication.module.css";

export default function ForceAuthentication(props) {

    const { user, loading} = useAuth();

    function renderContent() {
        return (
            <>
                {props.children}
            </>
        )
    }

    function renderLoading() {
        return (
            <div className={styles.imgLo}> 
                <Image src={loadingImg}/>
            </div>
        )
    }

    if(!loading && user?.email) {
        return renderContent();
    } else if(loading) {
        return renderLoading();
    } else{
        router.push('/welcome');
        return null;
    }
}