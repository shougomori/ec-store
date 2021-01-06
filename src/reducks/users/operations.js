import { signInAction,signOutAction } from "./actions";
import { push } from 'connected-react-router';
import {db, auth, FirebaseTimestamp} from '../../firebase/index';

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid

                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        
                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username:data.username
                            
                        }))
                       
                })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
};

export const resetPassword = (email) => {
    return async (dispatch) => {
       if (email === "") {
            alert("必須項目が未入力です")
            return false
       } else {
           auth.sendPasswordResetEmail(email)
               .then(() => {
                   alert("入力されたアドレスにリセット用のメールを送りました")
                   dispatch(push('/signin'))
               }).catch(() => {
                alert("リセットに失敗しました")
               })
        }
    }
}


export const signIn = (email,password) => {
    return async (dispatch, getSta) => {
        if (email === "" || password === "") {
            alert("必須項目が未入力です")
            return false
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user 

                if (user) {
                    const uid = user.uid

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()
                            
                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username:data.username
                                
                            }))
                            dispatch(push('/'))
                    })
                }
        })
    }
}


export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {

        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            alert("必須項目が未入力です")
            return false
        }


        // Validations
       
        if (password !== confirmPassword) {
            alert('パスワードが一致しません。もう1度お試しください。')
            return false
        }
      

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user 
                
                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        customer_id: "",
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        payment_method_id: "",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }
                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                        dispatch(push('/'))
                    })


                }
        })
            
    }
}


export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
            dispatch(push('/signin'));
        })
    }
};