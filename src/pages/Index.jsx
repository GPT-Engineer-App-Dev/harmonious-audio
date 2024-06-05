import { Container, Text, VStack, Box, Heading, Button, Image, HStack } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const savePlaylist = () => {
    setPlaylists([...playlists, { name: playlistName, description: playlistDescription }]);
    setPlaylistName("");
    setPlaylistDescription("");
    closeModal();
  };

  const playSong = (songUrl) => {
    if (currentSong === songUrl && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentSong !== songUrl) {
        setCurrentSong(songUrl);
        setProgress(0);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => setProgress(audioRef.current.currentTime);
      const handleEnded = () => setIsPlaying(false);

      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("ended", handleEnded);

      return () => {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentSong]);

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
            <HStack justifyContent="space-between">
              <Box>
                <Heading as="h3" size="md">{playlist.name}</Heading>
                <Text mt={2}>{playlist.description}</Text>
              </Box>
              <IconButton
                icon={<FaPlay />}
                onClick={() => playSong("/path/to/song.mp3")} // Replace with actual song URL
                colorScheme="teal"
                aria-label="Play"
              />
            </HStack>
          </Box>
        ))}
      </VStack>
      {currentSong && (
        <Box position="fixed" bottom="0" width="100%" bg="gray.800" color="white" p={4}>
          <audio ref={audioRef} src={currentSong} />
          <VStack spacing={2}>
            <HStack spacing={4}>
              <IconButton
                icon={isPlaying ? <FaPause /> : <FaPlay />}
                onClick={() => playSong(currentSong)}
                colorScheme="teal"
                aria-label={isPlaying ? "Pause" : "Play"}
              />
              <Slider
                value={progress}
                min={0}
                max={audioRef.current?.duration || 100}
                onChange={(val) => (audioRef.current.currentTime = val)}
                flex="1"
              >
                <SliderTrack bg="teal.100">
                  <SliderFilledTrack bg="teal.500" />
                </SliderTrack>
                <SliderThumb boxSize={4} />
              </Slider>
            </HStack>
          </VStack>
        </Box>
      )}
    </Container>
  );
};

export default Index;