import { useEffect, useState } from "react";
import useAuthorsStore from "../../Stores/useAuthorsStore";
import useBooksStore from "../../Stores/useBooksStore";
import FormGenerator from "../../Components/FormGenerator";
import Liste from "../../Components/Liste";

export default function AddBook() {
  const { register, messageForm } = useBooksStore();
  const { authors, fetchAllAuthors } = useAuthorsStore();

  const [formData, setFormData] = useState({});
  const [selectAuthor, setSelectedAuthor] = useState([]);
  const fields = [
    { name: "title", label: "Titre du Livre", type: "text" },
    { name: "summary", label: "Résumer", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllAuthors();
  }, [fetchAllAuthors]);

  const dataAuthors = authors;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (data) => {
    register(data, { authors: selectAuthor });
  };

  const handleSelectAuthor = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectAuthor.includes(clickedItemId)) {
      setSelectedAuthor(selectAuthor.filter((id) => id !== clickedItemId));
    } else {
      setSelectedAuthor([...selectAuthor, clickedItemId]);
    }
  };
  return (
    <div className="Box">
      <h1>Livres</h1>
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
          titleListe={"Autheur"}
          listes={dataAuthors}
          onSelect={handleSelectAuthor}
          selectedItems={selectAuthor}
        />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
