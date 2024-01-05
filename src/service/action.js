import { REGISTER, LOGIN, GETUSERLIST, ISLOGIN,ADDUSER,DELETEUSER,EDITUSER} from "./actiontypes";
import axios from "axios";




export const registerDetails = (data) => (dispatch) => {
    axios({
        method: 'POST',
        url: "http://node.mitrahsoft.co.in/register",
        data: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password
        }
    }).then((response) => {
        console.log(response);
        dispatch({
            type: REGISTER,
            payload: response.data
        })
    }).catch(error => {
        console.error('Error', error);
    });

}


export const loginDetails = (data, history) => (dispatch) => {
    // console.log(data.login);
    axios({
        method: 'POST',
        url: "http://node.mitrahsoft.co.in/login",
        data: {
            email: data.email,
            password: data.password
        }
    }).then((response) => {
        console.log("response", response);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('auth', true);
        localStorage.setItem('type', data.login)
        dispatch(isLogin(true))
        history.push('/dashboard')
    }).catch((error) => {
        console.error('response', error.response.data);
        dispatch ({
            type:LOGIN,
            payload:error.response.data
        })
    })
}

export const adduserDetails = (data, token) => (dispatch) => {
    // console.log("getuserDetails", data,token);
    axios({
        method: 'POST',
        url: "http://node.mitrahsoft.co.in/user",
        headers:{
            Authorization:token
        },
        data: {
            name: data.name,
            gender: data.gender,
            job: data.job,
            profile_img: data.image
        }
    }).then((response)=>{
        console.log(response);
        dispatch({
            type: ADDUSER,
            payload: response.data
        })
    }).catch(error =>{
        console.log('error',error);
    })
}

export const getuserDetails = (token) => (dispatch) =>{
    let data;
    axios({
        method:'GET',
        url:'http://node.mitrahsoft.co.in/users',
        headers:{
            Authorization:token
        }
    }).then((response)=>{
        data = response.data.recordset;
        console.log("getuserDetails",response.data.recordset);
        dispatch({
            type:GETUSERLIST,
            payload:response.data.recordset
        })
    }).catch(error =>{
        console.log("error",error);
    })
    return data;
}

export const deleteUser = (id,token) => (dispatch) =>{
    console.log("id",typeof id,token);
    axios({
        method:'DELETE',
        url:`http://node.mitrahsoft.co.in/user/${id}`,
        headers:{
            Authorization:token
        }
    }).then((response)=>{
        console.log(response.data);
        dispatch({
            type:DELETEUSER,
            payload:response.data
        })
    }).catch(error =>{
        console.log("error",error);
    })
}

export const edituserDetails = (data,id,token) => (dispatch) =>{
    axios({
        method:'PUT',
        url:`http://node.mitrahsoft.co.in/user/${id}`,
        headers:{
            Authorization:token
        },
        data: {
            name: data.name,
            gender: data.gender,
            job: data.job,
            profile_img: data.image
        }
    }).then((response)=>{
        console.log(response);
        dispatch({
            type:EDITUSER,
            payload:"Edited Successfully"
        })
    }).catch (error =>{
        console.log(error);
    })
}

export const isLogin = (isLoggedIn, history) => (dispatch) => {
    dispatch({
      type: ISLOGIN,
      payload: isLoggedIn,
    });
  
    if (!isLoggedIn) {
        // Clear user-related data from localStorage if logging out
        localStorage.setItem('auth', false);
        localStorage.removeItem('type');
        localStorage.removeItem('token');
        history.push('/login'); // Redirect to the login page or any other page
      }
  };