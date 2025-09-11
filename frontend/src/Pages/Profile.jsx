import React, { use, useEffect } from 'react'
import { Avatar, Center, Flex, Text } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';  
import { Button, Paper } from '@mantine/core';


import Service from '../utils/http';
import { GET_USER_URLS } from '../utils/urls';
const obj = new Service();

export default function Profile() {

    const[userData,setUserData] = React.useState({});


    const getProfileData = async()=>{   
        try{
            const data = await obj.get(GET_USER_URLS);
            setUserData(data);
            console.log(data);
        }
        catch(err){
            console.log(err);
        }   
    }
    useEffect(()=>{

        getProfileData();

    },[]);


  return (
    <div>
            <Center style={{display:'flex',flexDirection:'column',gap:'20px',marginTop:'50px'}}>
            <Paper radius="md" withBorder  p="lg" bg="#1e1e1e">
            <Avatar
                src={userData.avatar}
                size={120}
                radius={120}
                mx="auto"
            />
            <Text ta="center" fz="lg" fw={500} mt="md" style={{color:'white'}}>
                User: {userData.name}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
                User ID: {userData._id}
            </Text>
            <Text style={{color:'white'}} >
                Email : {userData.email}
            </Text>
            </Paper>
        </Center>
    </div>
  )
}
































{/* <Center style={{display:'flex',flexDirection:'column',gap:'20px',marginTop:'50px'}}>
            <div>
                <Avatar variant="filled" radius="md" size="xl" color="cyan" src={userData.avatar} />
            </div>
        
            <div>
                <Text>User: {userData.name}</Text>
            </div>

            <div>
                <Text>User ID: {userData._id}</Text>
            </div>

            <div>
                <Text>User Mail: {userData.email}</Text>
            </div>

        </Center> */}
