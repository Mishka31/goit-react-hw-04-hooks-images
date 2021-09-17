import { useState } from "react";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmitChange = (e) =>
    setValue(e.currentTarget.value.toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      return alert("Пустое поле");
    }
    onSubmit(value);
    setValue("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleSubmitChange}
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
