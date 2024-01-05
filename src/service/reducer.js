import { REGISTER, LOGIN,GETUSERLIST,ISLOGIN,ADDUSER,DELETEUSER,EDITUSER } from "./actiontypes";

export const initialValue = {
    is_login:false,
    editedResponse:'',
    addedDetails:[],
    loginResponse:"",
    registeredResponse:"",
    addedResponse:"",
    deleted:""
    };
export const reducer =(state=initialValue,action)=>{
    console.log("state",action.payload);
    switch (action.type) {

        case REGISTER: {
            console.log("Register");
            return { ...state,registeredResponse: action.payload }
        }

        case LOGIN: {
            console.log("Login");
            return { ...state,loginResponse:action.payload}
        }
        case ADDUSER:{
            console.log("ADD");
            return {...state,addedResponse:action.payload}
        }
        case GETUSERLIST:{
            console.log("GETUSER");
            return {...state,addedDetails:action.payload}
        }
        case ISLOGIN:{
            return{...state,is_login:action.payload }
        }
        case DELETEUSER:{
            return {...state,deleted:action.payload}
        }
        case EDITUSER:{
            return {...state,editedResponse:action.payload}
        }
        default: {
            return { ...state }
        }
    }
}