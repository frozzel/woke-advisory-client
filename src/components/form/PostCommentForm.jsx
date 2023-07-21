import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-lg";
export default function AppSearchForm({
  showResetIcon,
  placeholder,
  inputClassName = defaultInputStyle,
  onSubmit,
  onReset,
}) {
  const [content, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
  };

  const handleReset = () => {
    setValue("");
    onReset();
  };

  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        type="text"
        className={
          "border-2 transition bg-transparent rounded p-1 outline-none " +
          inputClassName
        }
        placeholder={placeholder}
        value={content}
        onChange={({ target }) => setValue(target.value)}
      />

      {showResetIcon ? (
        <button
          onClick={handleReset}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
}
