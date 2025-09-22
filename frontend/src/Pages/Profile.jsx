import React, { useEffect, useState } from 'react';
import { Avatar, Center, Paper, Text, Loader } from '@mantine/core';
import Service from '../utils/http';
import { GET_USER_URLS } from '../utils/urls';

const obj = new Service();

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfileData = async () => {
    try {
      const data = await obj.get(GET_USER_URLS);
      setUserData(data);
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (loading) {
    return (
    <Center style={{ height: '50vh', flexDirection: 'column', gap: '10px' }}>
        <Text style={{ fontSize: '50px' }}>♾️</Text>
        <Text>Loading your URLs...</Text>
    </Center>
    );
  }

  
  if (!userData) return null;

  return (
    <Center style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px' }}>
      <Paper radius="md" withBorder p="lg" bg="#1e1e1e" style={{ textAlign: 'center', color: 'white' }}>
        <Avatar
          src={userData.avatar}
          alt={userData.name}
          size={120}
          radius={120}
          mx="auto"
        >
          {userData.name?.[0]} {/* fallback letter */}
        </Avatar>

        <Text fz="lg" fw={500} mt="md">
          User: {userData.name}
        </Text>
        <Text c="dimmed" fz="sm">
          User ID: {userData._id}
        </Text>
        <Text>Email: {userData.email}</Text>
        
      </Paper>
    </Center>
  );
}
