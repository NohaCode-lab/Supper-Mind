
function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-xl p-4 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;