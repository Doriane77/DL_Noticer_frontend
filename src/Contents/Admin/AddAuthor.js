import { useEffect, useState } from "react";
import FormGenerator from "../../Components/FormGenerator";
import Liste from "../../Components/Liste";
import useBooksStore from "../../Stores/useBooksStore";
import useAuthorsStore from "../../Stores/useAuthorsStore";

export default function AddAuthor() {
  const { books, fetchAllBooks } = useBooksStore();
  const { register, messageForm } = useAuthorsStore();
  const [formData, setFormData] = useState({});
  const [select, setSelected] = useState([]);
  const fields = [
    { name: "author", label: "Nom de l'autheur", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllBooks();
  }, [fetchAllBooks]);
  const dataBooks = books;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (data) => {
    console.log("Données du formulaire:", data, select);
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
      <h1>Autheur</h1>
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
          titleListe={"Livre"}
          listes={dataBooks}
          onSelect={handleSelect}
          selectedItems={select}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
