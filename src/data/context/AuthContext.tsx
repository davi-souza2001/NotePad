import route from "next/router";
import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import firebase from "../../firebase/config";
import User from "../../model/User";


interface AuthContextProps {
    user?: User;
    loading?: boolean;
    loginGoogle?: () => Promise<void>;
    logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function userNormal(userFirebase: firebase.User): Promise<User> {
    const token = await userFirebase.getIdToken()
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provedor: userFirebase.providerData[0].providerId,
        imagemUrl: userFirebase.photoURL
    }
}

function adminCookie(logged: boolean) {
    if (logged) {
        Cookie.set("admin-note-pad-auth", logged, {
            expires: 7
        })
    } else {
        Cookie.remove("admin-note-pad-auth");
    }
}

export function AuthProvider(props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>(null);

    async function configureSection(userFirebase) {
        if (userFirebase?.email) {
            const user = await userNormal(userFirebase);
            setUser(user);
            adminCookie(true);
            setLoading(false);
            return user.email;
        } else {
            setUser(null);
            adminCookie(false);
            setLoading(false);
            return false;
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true);
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            );

            configureSection(resp.user);
            route.push('/');
        } finally {
            setLoading(true);
        }
    }


    async function logout() {
        try {
            setLoading(true);
            await firebase.auth().signOut();
            await configureSection(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(Cookie.get("admin-note-pad-auth")) {
            const cancel = firebase.auth().onIdTokenChanged(configureSection);
            return () => cancel();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            loginGoogle,
            logout
        }}>

            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
