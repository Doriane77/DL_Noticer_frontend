import { useEffect, useState } from "react";
import useDirectorsStore from "../../Stores/useDirectorsStore";
import useMoviesStore from "../../Stores/useMoviesStore";
import FormGenerator from "../../Components/FormGenerator";
import Liste from "../../Components/Liste";
import useActorsStore from "../../Stores/useActorsStore";

export default function AddDirector() {
  const { movies, fetchAllMovies, messageForm } = useMoviesStore();
  const { register } = useDirectorsStore();
  const [formData, setFormData] = useState({});
  const [selectMovie, setSelectedMovie] = useState([]);
  const fields = [
    { name: "director", label: "Titre du film", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);
  const dataMovie = movies;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (data) => {
    register(data, { movies: selectMovie });
  };
  const handleSelectMovie = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectMovie.includes(clickedItemId)) {
      setSelectedMovie(selectMovie.filter((id) => id !== clickedItemId));
    } else {
      setSelectedMovie([...selectMovie, clickedItemId]);
    }
  };

  return (
    <div className="Box">
      <h1>Réalisateur</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <p>{messageForm}</p>
        <FormGenerator
          fields={fields}
          handleFieldChange={handleFieldChange}
          formData={formData}
        />
        <Liste
          titleListe={"Films"}
          listes={dataMovie}
          onSelect={handleSelectMovie}
          selectedItems={selectMovie}
        />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
