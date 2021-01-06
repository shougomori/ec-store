// export const SIGN_IN = "SIGN_IN";
// export const signInAction = (userState) => { 
//     return {
//         type: "SIGN_IN",
//         payload: {
//             isSignedIn: true,
//             role: userState.role,
//             uid: userState.uid,
//             username:userState.username
//         }
//     }
// }


// export const SIGN_OUT = "SIGN_OUT";
// export const signOutAction = () => { 
//     return {
//         type: "SIGN_OUT",
//         payload: {
//             isSignedIn: false,
//             role:"",
//             uid: "",
//             username:""
//         }
//     }
// }

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products) => {
    return {
        type: "FETCH_PRODUCTS",
        payload: products
    }
}