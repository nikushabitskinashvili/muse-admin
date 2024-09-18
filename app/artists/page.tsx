"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.scss";
import { Button } from "../Components/Buttons/Buttons";
import ReusableModal from "../Components/ReusableModal/ReusableModal";
import { ArtistCard } from "../Components/ArtistCard/ArtistCard";
import AddArtistsModule from "../Components/modals/AddArtistsModal";
import { FieldValues, FormProvider } from "react-hook-form";

interface Artist {
  id: string;
  title: string;
  src: string;
}

const ArtistPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isAddArtistModalOpen, setIsAddArtistModalOpen] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("https://back.museappofficial.com/artist");
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const openAddArtistModal = () => setIsAddArtistModalOpen(true);
  const closeAddArtistModal = () => setIsAddArtistModalOpen(false);

  const handleAddArtistSubmit = async (data: FieldValues) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append('name', data.name)
      formData.append("biography", data.biography)
      formData.append("image", data.file[0])
      formData.append("cover", data.file[0])

      const response = await axios.post("https://back.museappofficial.com/artist", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
      );

      closeAddArtistModal();
      setArtists([...artists, response.data]);
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.containerWrapper}>
          <span className={styles.title}>The Artists</span>
          <Button title="Add New Artist +" onClick={openAddArtistModal} bg="pink" />
        </div>

        <div className={styles.wrapper}>
          {artists.length > 0 ? (
            artists.map((item) => (
              <ArtistCard key={item.id} title={item.title} item={item} />
            ))
          ) : (
            <p>No artists available</p>
          )}
        </div>

        <ReusableModal
          isOpen={isAddArtistModalOpen}
          onClose={closeAddArtistModal}
          onSubmit={handleAddArtistSubmit}
          buttonTitle={"Add Artist"}>
          <AddArtistsModule />
        </ReusableModal>
      </div>
    </div>
  );
};

export default ArtistPage;
