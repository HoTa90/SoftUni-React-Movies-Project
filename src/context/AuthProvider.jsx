import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext.jsx";


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid); 
                const userDoc = await getDoc(userDocRef); 
                
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                } else {
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        username: currentUser.displayName || "No Username"
                    });
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const register = async (email, password, username) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        await updateProfile(newUser, { displayName: username });

        const userDocRef = doc(db, "users", newUser.uid); 
        await setDoc(userDocRef, {
            uid: newUser.uid,
            email: newUser.email,
            username
        });

        setUser({ uid: newUser.uid, email: newUser.email, username });
        return newUser;
    };

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const loggedInUser = userCredential.user;

        const userDocRef = doc(db, "users", loggedInUser.uid); 
        const userDoc = await getDoc(userDocRef); 
        if (userDoc.exists()) {
            setUser(userDoc.data());
        } else {
            setUser({
                uid: loggedInUser.uid,
                email: loggedInUser.email,
                username: loggedInUser.displayName
            });
        }

        return loggedInUser;
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

