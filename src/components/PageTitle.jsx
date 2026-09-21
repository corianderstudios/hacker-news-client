export default function PageTitle({ title, subtitle }) {
  return (
    <div className="p-4">
      <h1 className="text-neutral-700 text-6xl">{title}</h1>
      <p className="text-neutral-400 text-xl">{subtitle}</p>
    </div>
  );
}
