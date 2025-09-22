import React, { useEffect, useState } from 'react';
import {
  Table,
  Paper,
  Center,
  Loader,
  Button,
  Group,
  Switch,
  Text,
  Modal,
  TextInput,
} from '@mantine/core';
import Service from '../utils/http';
const obj = new Service();

export default function MyUrls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false); // new
  const [modalOpened, setModalOpened] = useState(false);
  const [currentUrlId, setCurrentUrlId] = useState(null);
  const [newShortCode, setNewShortCode] = useState('');

  // Fetch URLs with timeout
  const fetchMyUrls = async () => {
    try {
      const fetchPromise = obj.get("s/my/links");

      // Timeout promise
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
      );

      const res = await Promise.race([fetchPromise, timeout]);
      console.log(res);
      setUrls(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setTimeoutReached(true);
    }
  };

  useEffect(() => {
    fetchMyUrls();
  }, []);

  // Toggle URL active state
  const toggleActive = async (id, currentState) => {
    try {
      await obj.patch(`s/my/links/changestatus/${id}`, { isActive: !currentState });
      setUrls((prev) =>
        prev.map((url) =>
          url._id === id ? { ...url, isActive: !currentState } : url
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this URL?")) return;
    try {
      await obj.delete(`s/my/links/${id}`);
      setUrls((prev) => prev.filter((url) => url._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id, currentShortCode) => {
    setCurrentUrlId(id);
    setNewShortCode(currentShortCode);
    setModalOpened(true);
  };

  const saveShortCode = async () => {
    try {
      await obj.patch(`s/my/links/${currentUrlId}`, { shortCode: newShortCode });
      setUrls((prev) =>
        prev.map((url) =>
          url._id === currentUrlId ? { ...url, shortCode: newShortCode } : url
        )
      );
      setModalOpened(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: '50vh', flexDirection: 'column', gap: '10px' }}>
        <Text style={{ fontSize: '50px' }}>♾️</Text>
        <Text>Loading your URLs...</Text>
      </Center>
    );
  }

  if (timeoutReached) {
    return (
      <Center style={{ marginTop: '50px', flexDirection: 'column', gap: '10px' }}>
        <Text color="red">Loading took too long. Please try again.</Text>
        <Button onClick={() => {
          setLoading(true);
          setTimeoutReached(false);
          fetchMyUrls();
        }}>Retry</Button>
      </Center>
    );
  }

  if (urls.length === 0) {
    return (
      <Center style={{ marginTop: '50px' }}>
        <Text>No URLs found.</Text>
      </Center>
    );
  }

  return (
    <Center style={{ marginTop: '50px' }}>
      <Paper withBorder p="md" style={{ width: '95%', overflowX: 'auto' }}>

        {/* Edit Short Code Modal */}
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Edit Short Code"
          size="sm"
          centered
        >
          <TextInput
            label="New Short Code"
            placeholder="Enter new short code"
            value={newShortCode}
            onChange={(e) => setNewShortCode(e.target.value)}
          />
          <Group position="right" mt="md">
            <Button variant="default" onClick={() => setModalOpened(false)}>
              Cancel
            </Button>
            <Button onClick={saveShortCode}>Save</Button>
          </Group>
        </Modal>

        {/* Table */}
        <Table striped highlightOnHover style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>Original URL</th>
              <th style={thStyle}>Short URL</th>
              <th style={thStyle}>Short Code</th>
              <th style={thStyle}>Click Count</th>
              <th style={thStyle}>Active</th>
              <th style={thStyle}>Created At</th>
              <th style={thStyle}>Updated At</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={url._id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={{ ...tdStyle, maxWidth: '250px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                    {url.originalUrl}
                  </a>
                </td>
                <td style={{ ...tdStyle, maxWidth: '200px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                    {url.shortUrl}
                  </a>
                </td>
                <td style={tdStyle}>{url.shortCode}</td>
                <td style={tdStyle}>{url.clickCount}</td>
                <td style={tdStyle}>
                  <Switch checked={url.isActive} onChange={() => toggleActive(url._id, url.isActive)} />
                </td>
                <td style={tdStyle}>{new Date(url.createdAt).toLocaleString()}</td>
                <td style={tdStyle}>{new Date(url.updatedAt).toLocaleString()}</td>
                <td style={tdStyle}>
                  <Group spacing="xs">
                    <Button size="xs" color="blue" onClick={() => handleEdit(url._id, url.shortCode)}>
                      Edit
                    </Button>
                    <Button size="xs" color="red" onClick={() => handleDelete(url._id)}>
                      Delete
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Center>
  );
}

// Styles for table headers and cells
const thStyle = { border: '1px solid #ccc', padding: '8px', backgroundColor: '#f0f0f0' };
const tdStyle = { border: '1px solid #ccc', padding: '8px' };
