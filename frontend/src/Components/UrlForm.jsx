import { useState } from 'react';
import { TextInput, Button, Group, Center, Loader, Text } from '@mantine/core';
import Service from '../utils/http';
const obj = new Service();

export default function UrlForm(props) {
  const { setResponseData } = props;

  const [data, setData] = useState({
    originalUrl: '',
    customUrl: '',
    title: '',
    expirydata: '',
  });

  const [loading, setLoading] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const generateshorturl = async () => {
    setLoading(true);
    setTimeoutReached(false);

    try {
      // Minimum loading time: 2s
      const MIN_LOADING_TIME = 2000;
      const startTime = Date.now();

      // API call
      const res = await obj.post("s", data);

      // Calculate remaining time to show loader
      const elapsed = Date.now() - startTime;
      const remainingTime = MIN_LOADING_TIME - elapsed;

      if (remainingTime > 0) {
        setTimeout(() => {
          setResponseData(res);
          setLoading(false);
        }, remainingTime);
      } else {
        setResponseData(res);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setTimeoutReached(true);
    }
  };

  
  if (loading) {
    return (
      <Center style={{ height: '50vh', flexDirection: 'column', gap: '10px' }}>
        <Text style={{ fontSize: '50px' }}>♾️</Text>
        <Text>Generating your short URL...</Text>
      </Center>
    );
  }

  // Show timeout message if API fails
  if (timeoutReached) {
    return (
      <Center style={{ height: '50vh', flexDirection: 'column', gap: '10px' }}>
        <Text color="red">Request took too long. Please try again.</Text>
        <Button onClick={generateshorturl}>Retry</Button>
      </Center>
    );
  }

  return (
    <div>
      <Center
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '50px',
          width: '90%',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '30px',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h2 order={2} style={{ background: 'linear-gradient(90deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            URL Shortener
          </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '350px',
            margin: '40px auto',
          }}
        >
          <TextInput
            withAsterisk
            label="Original URL"
            placeholder="Enter Original URL"
            onChange={(e) => setData({ ...data, originalUrl: e.target.value })}
          />

          <TextInput
            label="Custom URL"
            placeholder="Enter Custom URL"
            onChange={(e) => setData({ ...data, customUrl: e.target.value })}
          />

          <TextInput
            label="Title"
            placeholder="Enter Title"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />

          <TextInput
            label="Expiry Date"
            placeholder="Enter Expiry Date"
            onChange={(e) => setData({ ...data, expirydata: e.target.value })}
          />
        </div>

        <Group justify="center" mt="xl">
          <Button
            disabled={data.originalUrl.length < 10}
            onClick={generateshorturl}
          >
            Generate the Link
          </Button>
        </Group>
      </Center>
    </div>
  );
}
