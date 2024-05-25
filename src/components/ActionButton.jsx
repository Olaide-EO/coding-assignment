const ActionButton = ({ buttonText, onClick }) => {
  return (
    <footer className="text-center">
      <button className="btn btn-primary" onClick={onClick}>
        {buttonText}
      </button>
    </footer>
  );
};

export default ActionButton;
