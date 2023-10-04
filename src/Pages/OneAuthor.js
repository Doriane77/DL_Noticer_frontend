import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthorsStore from "../Stores/useAuthorsStore";
import Sections from "../Components/Sections";
import "../Sass/Pages/OneAuthor.scss";
import ArticlesOne from "../Components/ArticlesOne";
import useBooksStore from "../Stores/useBooksStore";
import FormGenerator from "../Components/FormGenerator";
import Liste from "../Components/Liste";
import useAdminStore from "../Stores/useAdminStore";
export default function OneAuthor() {
  const { id } = useParams();
  const { admin } = useAdminStore();
  const { supprimer, currentAuthor, fetchOneAuthor, update, messageForm } =
    useAuthorsStore();
  const { books, fetchAllBooks } = useBooksStore();

  const [formData, setFormData] = useState({});
  const [select, setSelected] = useState([]);

  const fields = [
    { name: "author", label: "Nom de l'autheur", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllBooks();
  }, [fetchAllBooks]);
  useEffect(() => {
    let tab = [];
    if (currentAuthor) {
      const { author, image } = currentAuthor;
      setFormData({ author, image });
    }
    if (currentAuthor && currentAuthor.books) {
      for (let i = 0; i < currentAuthor.books.length; i++) {
        tab.push(currentAuthor.books[i]._id);
      }
    }
    setSelected(tab);
  }, [currentAuthor]);
  const dataBooks = books;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (data) => {
    update(id, data, { select: select });
  };
  const handleSelect = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (select.includes(clickedItemId)) {
      setSelected(select.filter((id) => id !== clickedItemId));
    } else {
      setSelected([...select, clickedItemId]);
    }
  };
  let dataBook = [];
  useEffect(() => {
    fetchOneAuthor(id);
  }, [id, fetchOneAuthor]);

  if (!currentAuthor) {
    return <p>Chargement...</p>;
  } else {
    dataBook = currentAuthor.books;
  }
  return (
    <div className="OneAuthor">
      <h2>Autheur</h2>
      {admin && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);
            }}
          >
            <p className="message">{messageForm}</p>
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
            <button type="submit">Modifier</button>
          </form>
          <button className="sup" onClick={() => supprimer(id)}>
            Supprimer
          </button>
        </>
      )}

      <ArticlesOne
        image={currentAuthor.image}
        imgdesc={currentAuthor.author}
        name={currentAuthor.author}
      />
      {dataBook.lenght !== 0 && (
        <Sections props={{ data: dataBook, page: "Books" }} />
      )}
    </div>
  );
}
