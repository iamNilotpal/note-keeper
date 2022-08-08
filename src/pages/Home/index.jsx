import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import Layout from '../../layout/Layout';
import PreviewImage from '../../components/shared/PreviewImage';
import TextField from '../../components/shared/Input/TextField';
import NoteMenu from '../../components/shared/NoteMenu';
import toast from '../../utils/toast';

const MAX_ALLOWED_SIZE = 300000; // 300KB
const fileTypes = ['image/png', 'image/gif', 'image/jpeg'];

const HomePage = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const textFieldRef = useRef();

  useEffect(() => {
    textFieldRef.current?.focus();
  }, []);

  const handleClose = () => {
    setShowTextField(false);
    setImage(null);
  };

  const handleImageUpload = (files) => {
    const image = files[0];
    if (!image) return;

    if (image.size > MAX_ALLOWED_SIZE)
      return toast({ message: 'File size bigger than 300KB.', type: 'error' });

    if (!fileTypes.includes(image.type))
      return toast({
        message: 'Only JPG, PNG and GIF are allowed.',
        type: 'error',
      });

    const reader = new FileReader();
    setLoading(true);

    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setLoading(false);
      setImage(reader.result);
    };
  };

  return (
    <Layout>
      <Stack direction='row'>
        return (
        <Container
          style={{
            paddingBottom: showTextField ? '6px' : '0px',
            paddingTop: image ? '20px' : '0px',
            marginTop: '80px',
            zIndex: '1000000',
            display: 'flex',
            flexDirection: 'column',
            boxShadow:
              '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
            borderRadius: '10px',
          }}
          maxWidth='sm'
        >
          {image && (
            <PreviewImage image={image} setImage={setImage} loading={loading} />
          )}
          {showTextField && <TextField multiline={false} placeholder='Title' />}
          <TextField
            placeholder='Take a note...'
            handleShowTextField={() => setShowTextField(true)}
            multiline={true}
            fieldRef={textFieldRef}
          />
          {showTextField && (
            <NoteMenu
              handleClose={handleClose}
              handleImageUpload={handleImageUpload}
            />
          )}
        </Container>
      </Stack>
    </Layout>
  );
};

export default HomePage;