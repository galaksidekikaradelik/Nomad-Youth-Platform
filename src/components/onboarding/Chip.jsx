export default function Chip({ active, onClick, children }) {
  return (
    <button type="button" className={"ny-chip" + (active ? " ny-chip-active" : "")} onClick={onClick}>
      {children}
    </button>
  );
}