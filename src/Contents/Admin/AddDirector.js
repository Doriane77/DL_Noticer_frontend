import { useEffect, useState } from "react";
import useDirectorsStore from "../../Stores/useDirectorsStore";
import useMoviesStore from "../../Stores/useMoviesStore";
import FormGenerator from "../../Components/FormGenerator";
import Liste from "../../Components/Liste";
import useActorsStore from "../../Stores/useActorsStore";

export default function AddDirector() {
  const { movies, fetchAllMovies } = useMoviesStore();
  const { actors, fetchAllActors } = useActorsStore();
  const { directors, fetchAllDirectors } = useDirectorsStore();
  const { register } = useDirectorsStore();
  const [formData, setFormData] = useState({});
  const [selectMovie, setSelectedMovie] = useState([]);
  const [selectActor, setSelectedActor] = useState([]);
  const [selectDirector, setSelectedDirector] = useState([]);
  const fields = [
    { name: "director", label: "Titre du film", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllMovies();
    fetchAllActors();
    fetchAllDirectors();
  }, [fetchAllMovies, fetchAllActors, fetchAllDirectors]);
  const dataMovie = movies;
  //   const dataActor = actors;
  const dataDirector = directors;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (data) => {
    register(data, { movies: selectMovie, directors: selectDirector });
  };
  const handleSelectMovie = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectMovie.includes(clickedItemId)) {
      setSelectedMovie(selectMovie.filter((id) => id !== clickedItemId));
    } else {
      setSelectedMovie([...selectMovie, clickedItemId]);
    }
  };
  // const handleSelectActor = (clickedItem) => {
  //   const clickedItemId = clickedItem._id;
  //   if (selectActor.includes(clickedItemId)) {
  //     setSelectedActor(selectActor.filter((id) => id !== clickedItemId));
  //   } else {
  //     setSelectedActor([...selectActor, clickedItemId]);
  //   }
  // };
  const handleSelectDirector = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectDirector.includes(clickedItemId)) {
      setSelectedDirector(selectDirector.filter((id) => id !== clickedItemId));
    } else {
      setSelectedDirector([...selectDirector, clickedItemId]);
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
        {/* <Liste
          titleListe={"Acteurs"}
          listes={dataActor}
          onSelect={handleSelectActor}
          selectedItems={selectActor}
        /> */}
        {/* <Liste
          titleListe={"Réalisateurs"}
          listes={dataDirector}
          onSelect={handleSelectDirector}
          selectedItems={selectDirector}
        /> */}
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
