export default function Payments() {
    return (
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold">Pay for Consultation</h2>
        <p className="mt-2">Scan the QR code below to pay via UPI</p>
        <img src="/qr-code.png" alt="UPI QR Code" className="mx-auto mt-4 w-40 h-40" />
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Confirm Payment</button>
      </div>
    );
  }
  