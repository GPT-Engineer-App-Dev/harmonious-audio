import { Container, Text, VStack, Box, Heading, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea } from "@chakra-ui/react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const savePlaylist = () => {
    setPlaylists([...playlists, { name: playlistName, description: playlistDescription }]);
    setPlaylistName("");
    setPlaylistDescription("");
    closeModal();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to MusicStream</Heading>
        <Text fontSize="lg" textAlign="center">Your ultimate destination for streaming music. Discover new tracks, create playlists, and enjoy your favorite tunes.</Text>
        <Box boxSize="sm" mt={6}>
          <Image src="/images/music-streaming.jpg" alt="Music Streaming" borderRadius="md" />
        </Box>
        <Button colorScheme="teal" size="lg" mt={6}>Start Listening</Button>
      <Button colorScheme="teal" size="lg" mt={6} onClick={openModal}>Create Playlist</Button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a New Playlist</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="Playlist Name" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} mb={4} />
              <Textarea placeholder="Playlist Description" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={savePlaylist}>Save</Button>
              <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {playlists.map((playlist, index) => (
          <Box key={index} p={4} shadow="md" borderWidth="1px" borderRadius="md" width="100%" mt={4}>
            <Heading as="h3" size="md">{playlist.name}</Heading>
            <Text mt={2}>{playlist.description}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;