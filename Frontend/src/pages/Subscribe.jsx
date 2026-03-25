export default function Subscribe() {
  const pay = async () => {
    const res = await fetch("http://localhost:5000/api/payment/checkout", {
      method: "POST"
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Subscribe</h2>
      <button onClick={pay} className="bg-green-500 text-white px-6 py-2">
        Subscribe Now
      </button>
    </div>
  );
}