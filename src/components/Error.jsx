export default function Error() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="mb-4">
          <h3 className="font-bold">No Posts Available</h3>
          <p>Hang tight! We'll have more for you soon.</p>
          <p>If you believe this is an error,</p>
          <p> feel free to reach out to us.</p>
        </div>
        <a className="contact p-2 rounded" href="mailto:hn@ycombinator.com">
          Contact
        </a>
      </div>
    </div>
  );
}
