import React from 'react'
import Service from '../utils/http';
import { QRCodeSVG } from "qrcode.react"




import { Center, Text } from '@mantine/core';
const obj = new Service();

export default function UrlResponse(props) {
const surl = obj.getBaseURL() + '/api/s/' + props?.responseData?.shortCode;
   return (
    <Center className='container-box-response'>
        <h2>Here is your Shortened URL</h2>  

        <div>
            <Text color="blue"> {surl} </Text>
        </div>

        <div>
            <QRCodeSVG 
            className='container-box-response' 
            imageSettings={{
                     excavate: true,
                     src: surl,
                     height: 100,
                     width: 100
                 }} 
                 value={surl} size={400}>
                <Image src={'/HomeBackground.png'} />
            </QRCodeSVG>
        </div>

    </Center>
   )

}
