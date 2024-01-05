import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';
import Button from '@mui/material/Button';
import { useHistory,useParams  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export const Preview = () => {
    const dispatch = useDispatch();
    let userId=useParams();
   
    console.log(typeof +userId);
    const history = useHistory();
    const token = localStorage.getItem('token')
    // console.log(token);
    const addedDetails = useSelector((state) => state.addedDetails);
    console.log(addedDetails);
    
    const preview=addedDetails.find((item,index)=>{
        console.log(typeof +userId.id);
        console.log(typeof item.id);
        return item.id === +userId.id
    });
    console.log(preview);

    const back = () => {
        history.push("/userlist")
    }
    return (
        <>
            <div><h3 className="head">User Details</h3></div>
            <div className="mainContainer">
                <div className="addBack"><Button className="button" onClick={back}>Back</Button></div>
                <div className="contentContainer">
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 200,
                                height: 200,
                            },
                        }}
                    >
                        <Paper>
                            <div className='userDetails'>
                                <div className='userName'>{preview.name}</div>
                                <div>ID:{preview.id}</div>
                                <div>{preview.job}</div>
                                <div>{preview.name} is a {preview.job}</div>
                            </div>
                        </Paper>
                       
                        <Paper>
                            <div>
                                <img src={preview.profile_picture} alt="image" className='previewImage'/>
                            </div>
                        </Paper>
                    </Box>
                </div>
            </div>
        </>
    );
}
