import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from "react";
import { useDispatch } from 'react-redux';

export const Commonmodal = ({openModal,closeModal,text,func}) => {
    
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 5,
    };

    return (
        <>
            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {
                            text === "Edit" ?
                                <>
                                    Are you  sure you want to Edit this user
                                </> : <>
                                    Are you  sure you want to Delete this user
                                </>

                        }
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                        <Button onClick={() =>(closeModal(false), func(false))}>no</Button>
                        <Button id="modal-modal-description" onClick={()=>func(true)}>yes</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
