import React from "react";

export default function FormGenerator({ fields, handleFieldChange, formData }) {
  return (
    <>
      {fields.map((field, index) => (
        <input
          key={index}
          type={field.type}
          name={field.name}
          id={field.name}
          placeholder={field.label}
          value={formData[field.name] || ""}
          onChange={(e) => handleFieldChange(field.name, e.target.value)}
        />
      ))}
    </>
  );
}
