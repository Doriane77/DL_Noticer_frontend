import { useEffect, useState } from "react";
import FormGenerator from "../../Components/FormGenerator";
import Liste from "../../Components/Liste";
import useMoviesStore from "../../Stores/useMoviesStore";
import useActorsStore from "../../Stores/useActorsStore";

export default function AddActor() {
  const { movies, fetchAllMovies } = useMoviesStore();
  const { register, messageForm } = useActorsStore();
  const [formData, setFormData] = useState({});
  const [select, setSelected] = useState([]);
  const fields = [
    { name: "name", label: "Nom ", type: "text" },
    { name: "surname", label: "Prénom", type: "text" },
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
    register(data, { select: select });
  };
  const handleSelect = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (select.includes(clickedItemId)) {
      setSelected(select.filter((id) => id !== clickedItemId));
    } else {
      setSelected([...select, clickedItemId]);
    }
  };

  return (
    <div className="Box">
      <h1>Acteurs</h1>
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
          onSelect={handleSelect}
          selectedItems={select}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
