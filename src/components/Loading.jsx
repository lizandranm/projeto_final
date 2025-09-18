// src/components/Loading.jsx
export default function Loading({ text = "Carregando..." }) {
  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <div className="spinner-border text-primary me-2" role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      <span>{text}</span>
    </div>
  );
}