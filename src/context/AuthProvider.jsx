import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext.jsx";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

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
            setIsLoading(false)
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const register = async (email, password, username) => {
        setIsLoading(true);
        try {
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
        } catch (error) {
            console.error("Registration failed:", error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        setIsLoading(true); 
        try {
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
        
        } finally {
            setIsLoading(false); 
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};