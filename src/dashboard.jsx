import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { isLogin } from './service/action';
import { object } from 'yup';


export const Dashboard = () => {

    const addedDetails = useSelector((state) => state.addedDetails);
    const history = useHistory();
    const dispatch = useDispatch();
    const logout = () => {
        console.log("logout");
        dispatch(isLogin(false, history))
        history.push("/login");
    }
    const userList = () => {
        console.log("User List");
        history.push("/userlist")
    }


    let maleCount = 0;
    let femaleCount = 0;
    addedDetails.filter((item) => {
        if (item.gender == "male") {
            return maleCount++;
        }
        else {
            return femaleCount++;
        }
    })
    const jobCount = addedDetails.reduce((acc, cur) => {
        acc[cur.job] = acc[cur.job] ? acc[cur.job]++ : 1
        return acc

    }, {})
    console.log(jobCount);

    return (
        <>

            <div><h3 className="dashHead">Home Page</h3></div>
            <div className="homeContainer">
                <div className="contentContainer">
                    <div className="homeButton">
                        <Button variant="contained" onClick={logout}>Logout</Button>
                        <Button variant="contained" onClick={userList}>User list</Button>
                    </div>
                    <div>
                        <h3 className="count">TOTAL USERS COUNT:{addedDetails.length}</h3>
                    </div>
                    <div className="genderTable">
                        <h4>Table Based On Counts Of The Gender</h4>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Men</TableCell>
                                        <TableCell align="center">Women</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">{maleCount}</TableCell>
                                        <TableCell align="center">{femaleCount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="roleTable">
                        <h4>Table Based On Counts Of Job Role</h4>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            Object.keys(jobCount).map((item)=>{
                                                return (
                                                    <TableCell align="center">{item}</TableCell>
                                                )
                                            })
                                        }
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {
                                            Object.values(jobCount).map((item)=>{
                                                return (

                                                    <TableCell align="center">{item}</TableCell>
                                                )
                                            })
                                        }
                                        
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}