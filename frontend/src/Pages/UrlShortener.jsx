import React, { useState } from 'react'

import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Center } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import UrlForm from '../Components/UrlForm';
import UrlResponse from '../Components/UrlResponse';


export default function UrlShortener() {
    const [responseData, setResponseData] = useState(null);

    return (
        <div>
            {responseData? <UrlResponse responseData = {responseData}/> : <UrlForm setResponseData={setResponseData} />}
        </div>
    )
    
}
