export default function Error({ message }) {
  return (
    <div className="flex items-center h-screen">
      <p>Something went wrong: {message}</p>
    </div>
  );
}
