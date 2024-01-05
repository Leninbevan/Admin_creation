import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { deleteUser, getuserDetails, isLogin } from './service/action';
import { ADDUSER, DELETEUSER, EDITUSER } from './service/actiontypes';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Cardimage from "./image (11).png"
import { Avatar } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Commonmodal } from "./modal";


export const Userlist = () => {

    const addedData = useSelector((state) => state.addedDetails);
    const deleted = useSelector((state) => state.deleted);
    const edited = useSelector((state) => state.editedResponse);
    const addedResponse = useSelector((state) => state.addedResponse);
    const [modal, setModal] = useState(false)
    const [text, setText] = useState("")
    const [delid, setDelId] = useState(0)

    console.log("deleted", edited);
    // const [delete,setDelete] = useState(false);
    // const[addedData,setAddedData]=useState([])
    console.log('test123', addedData);
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    // const [isdeleted,SetIsDeleted]=useState(false)


    let history = useHistory();
    const addUser = () => {
        console.log("adduser");
        history.push("/adduser")
    }

    const editData = (id) => {
        console.log("edit", id);
        setModal(true)
        setText("Edit")
        history.push(`/editpage/${id}`)

    }

    const userData = (id) => {
        console.log("user data");
        history.push(`/preview/${id}`)
        console.log(id);
    }

    const deleteData = (id) => {
        setDelId(id)
        setModal(true)
        setText("Delete")
    }

    const modalData = (res) => {
        console.log("res",res);
        // res ? dispatch(deleteUser(delid, token)) : ''
        if(res){
            dispatch(deleteUser(delid, token))
        }
        setModal(false)
    }

    const logout = () => {
        dispatch(isLogin(false, history))
        history.push("/login");
    }

    const back = () => {
        history.push("/dashboard")
    }

    useEffect(() => {
        const token = localStorage.getItem('token' || '');
        dispatch(getuserDetails(token))
        
        dispatch({
            type: ADDUSER,
            payload: ""
        })
        dispatch({
            type: DELETEUSER,
            payload: ""
        })
        dispatch({
            type: EDITUSER,
            payload: ''
        })
        // SetIsDeleted(isdeleted && false);
    }, [deleted?.message, addedData?.length, edited, addedResponse])

    return (
        <>
            <div>
                <div>
                    <div><h3 className="userHead">User List</h3></div>

                </div>

                <div className="userContainer">
                    <div className="contentContainer">
                        <div className="userButton">
                            <div className='userBack'><Button variant="contained" onClick={back}>Back</Button></div>
                            <div className="userAdd">
                                <Button variant="contained" onClick={addUser}>Add User</Button>
                                <Button variant="contained" className='userLogout' onClick={logout}>Logout</Button>
                            </div>
                        </div>
                        <div className='allCards'>
                            {
                                addedData?.map((item, index) => {
                                    return (
                                        <Card sx={{ maxWidth: 345 }} style={{ position: "relative", marginTop: '20px', marginBottom: '20px' }}>
                                            <CardMedia className="cardImages">

                                                <img src={Cardimage} alt="log" style={{ width: "100%" }} />

                                                <Avatar

                                                    alt="Logo"
                                                    src={item.profile_picture}
                                                    sx={{ width: 80, height: 80 }}
                                                    style={{ position: "absolute", top: 36, left: 18 }}
                                                    onClick={() => userData(item.id)}

                                                />

                                            </CardMedia>
                                            <CardContent>
                                                <Typography gutterBottom sx={{ fontWeight: "bold" }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography sx={{ mb: 1, fontSize: "small" }}>
                                                    {item.job}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: "center", gap: '35px' }}>

                                                <Button size="small" className="editButton" onClick={() => editData(item.id)}>Edit</Button>

                                                <Button size="small" className="deleteButton" onClick={() => deleteData(item.id)}>Delete</Button>
                                            </CardActions>
                                        </Card>
                                    )
                                })

                            }
                            <div>
                                <Commonmodal openModal={modal} closeModal={setModal} text={text} func={modalData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
