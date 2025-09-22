import React, { useState, useRef } from 'react';
import Service from '../utils/http';
import { QRCodeSVG } from "qrcode.react";
import { Center, Text, Card, Title, Stack, Button, CopyButton, Notification, Group } from '@mantine/core';
import { IconCheck, IconDownload } from '@tabler/icons-react';

const obj = new Service();

export default function UrlResponse(props) {
  const surl = obj.getBaseURL() + '/api/s/' + props?.responseData?.shortCode;
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = svg.width.baseVal.value;
    canvas.height = svg.height.baseVal.value;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'qrcode.png';
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  };

  return (
    <Center 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea, #764ba2)', 
        padding: '20px' 
      }}
    >
      <Card 
        shadow="xl" 
        radius="md" 
        style={{ 
          maxWidth: 450, 
          width: '100%', 
          padding: '30px', 
          textAlign: 'center',
          backgroundColor: 'white'
        }}
      >
        <Stack align="center" spacing="md" ref={qrRef}>
           <h2 order={2} style={{ background: 'linear-gradient(90deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Your Shortened URL
          </h2>

          <Text color="blue" style={{ wordBreak: 'break-all', fontSize: '16px' }}>
            {surl}
          </Text>

          <QRCodeSVG
            value={surl}
            size={200}
            level="H"
            imageSettings={{
              src: '/favicon.ico', // logo in center
              height: 40,
              width: 40,
              excavate: true
            }}
          />

          <Group spacing="md" position="center" mt="md">
            <CopyButton value={surl} onCopy={() => setCopied(true)}>
              {({ copy }) => (
                <Button 
                  variant="gradient" 
                  gradient={{ from: 'teal', to: 'blue', deg: 45 }} 
                  onClick={() => { copy(); setCopied(true); }}
                >
                  {copied ? 'Copied!' : 'Copy URL'}
                </Button>
              )}
            </CopyButton>

            <Button 
              variant="gradient"
              gradient={{ from: '#ff416c', to: '#ff4b2b', deg: 45 }}
              leftIcon={<IconDownload size={18} />} 
              onClick={downloadQRCode}
            >
              Download QR
            </Button>
          </Group>

          {copied && (
            <Notification
              icon={<IconCheck size={18} />}
              color="teal"
              title="Success"
              onClose={() => setCopied(false)}
            >
              URL copied to clipboard!
            </Notification>
          )}
        </Stack>
      </Card>
    </Center>
  );
}
