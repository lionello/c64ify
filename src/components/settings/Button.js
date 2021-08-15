function Button({ label, disabled, onClick, type }) {
  return (
    <div
      className={
        "settings__button " +
        (disabled ? "settings__button--disabled " : "") +
        (type ? "settings__button--" + type : "")
      }
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default Button;
