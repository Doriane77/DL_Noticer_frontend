import React, { useState } from "react";

export default function Liste({ listes, onSelect, selectedItems, titleListe }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Select">
      <p onClick={toggleList}>
        {isOpen
          ? `Fermer la liste : ${titleListe}`
          : `Ouvrir la liste : ${titleListe}`}
      </p>

      {isOpen && (
        <div className="boxListes">
          {listes.map((item) => {
            let write;
            if (titleListe === "Films" || titleListe === "Livre") {
              write = item.title;
            }
            if (titleListe === "Acteurs") {
              write = item.name + " " + item.surname;
            }
            if (titleListe === "Réalisateurs") {
              write = item.director;
            }
            return (
              <p
                key={item._id}
                onClick={() => onSelect(item)}
                style={{
                  backgroundColor: selectedItems.includes(item._id)
                    ? "transparent"
                    : "gray",
                }}
              >
                {write}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
