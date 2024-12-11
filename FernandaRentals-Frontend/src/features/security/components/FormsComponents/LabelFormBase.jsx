export const LabelFormBase = ({
  inputLabel,
  inputId,
  inputType,
  inputName,
  inputValue,
  inputOnChange,
  inputOnblur,
  evaluated,
  errorForm,
}) => {
  return (
    <>
      <label
        className="block text-white text-sm font-bold mb-2"
      >
        {inputLabel}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        id={inputId}
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={inputOnChange}
        onBlur={inputOnblur}
      />
      {{evaluated} && (
        <div className="text-red-500 font-bold text-xs my-1">
          {errorForm}
        </div>
      )}
    </>
  );
};
