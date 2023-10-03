import { useEffect, useState } from "react";
import useDirectorsStore from "../../Stores/useDirectorsStore";
import useMoviesStore from "../../Stores/useMoviesStore";
import FormGenerator from "../../Components/FormGenerator";
import Liste from "../../Components/Liste";
import useActorsStore from "../../Stores/useActorsStore";

export default function AddMovie() {
  const { register, messageForm } = useMoviesStore();
  const { actors, fetchAllActors } = useActorsStore();
  const { directors, fetchAllDirectors } = useDirectorsStore();

  const [formData, setFormData] = useState({});
  const [selectActor, setSelectedActor] = useState([]);
  const [selectDirector, setSelectedDirector] = useState([]);
  const fields = [
    { name: "title", label: "Titre du film", type: "text" },
    { name: "synopsis", label: "Synopsis", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllActors();
    fetchAllDirectors();
  }, [fetchAllActors, fetchAllDirectors]);

  const dataActor = actors;
  const dataDirector = directors;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (data) => {
    register(data, { directors: selectDirector, actors: selectActor });
  };

  const handleSelectActor = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectActor.includes(clickedItemId)) {
      setSelectedActor(selectActor.filter((id) => id !== clickedItemId));
    } else {
      setSelectedActor([...selectActor, clickedItemId]);
    }
  };
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
      <h1>Films</h1>
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
          titleListe={"Acteurs"}
          listes={dataActor}
          onSelect={handleSelectActor}
          selectedItems={selectActor}
        />
        <Liste
          titleListe={"Réalisateurs"}
          listes={dataDirector}
          onSelect={handleSelectDirector}
          selectedItems={selectDirector}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

// director: ObjectId
// actors: [ObjectId]
