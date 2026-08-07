import { CheckCircle } from "lucide-react";

export default function SuccessPanel({ text }) {
  return (
    <div className="ny-success ny-fade-in">
      <div className="ny-success-badge">
        <CheckCircle size={28} strokeWidth={1.8} />
      </div>

      <p>{text}</p>
    </div>
  );
}
