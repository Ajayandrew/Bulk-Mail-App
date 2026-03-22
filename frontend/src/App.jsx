import axios from "axios";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

function App() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sender, setSender] = useState("");
  const [status, setStatus] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [history, setHistory] = useState([]);

  const API = "http://localhost:5000";

  // Excel upload
  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const emails = rows
        .flat()
        .filter((cell) => typeof cell === "string" && cell.includes("@"))
        .map((e) => e.trim());
      setEmailList(emails);
    };
    reader.readAsArrayBuffer(file);
  };

  // Send mail
  const send = () => {
    if (!subject || !body || !sender || emailList.length === 0) {
      alert("All fields required");
      return;
    }

    setStatus(true);

    axios
      .post(`${API}/api/mail/send`, {
        subject,
        body,
        sender,
        emailList,
      })
      .then(() => {
        alert("✅ Sent Successfully");
        getHistory();
        setStatus(false);
      })
      .catch(() => {
        alert("❌ Failed");
        setStatus(false);
      });
  };

  // Fetch history
  const getHistory = () => {
    axios.get(`${API}/api/mail/history`).then((res) => setHistory(res.data));
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-700 p-6">
      {/* Header */}
      <header className="text-white text-center mb-6">
        <h1 className="text-4xl font-bold drop-shadow-lg">📧 Bulk Mail App</h1>
        <p className="text-lg mt-1 drop-shadow-sm">
          Send multiple emails easily with style and track your history!
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Form */}
        <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">
            Compose Email
          </h2>

          <input
            type="email"
            placeholder="Your Email (Sender)"
            className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setSender(e.target.value)}
          />

          <input
            placeholder="Subject"
            className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            placeholder="Email Body"
            className="w-full border p-3 rounded-lg mb-3 h-32 focus:ring-2 focus:ring-indigo-400 resize-none"
            onChange={(e) => setBody(e.target.value)}
          />

          <input
            type="file"
            accept=".xlsx"
            onChange={handleFile}
            className="w-full border-2 border-dashed border-indigo-300 p-6 rounded-lg cursor-pointer mb-3 hover:bg-indigo-50 transition"
          />
          <p className="text-gray-600 mb-3">
            Total Emails Loaded: <span className="font-bold">{emailList.length}</span>
          </p>

          <button
            onClick={send}
            disabled={status}
            className={`w-full py-3 rounded-xl text-white font-semibold transition 
              ${status ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-600"}`}
          >
            {status ? "Sending..." : "Send Emails"}
          </button>
        </div>

        {/* Right Side: History */}
        <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-2xl max-h-[600px] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">📜 Email History</h2>
          {history.length === 0 && (
            <p className="text-gray-500 text-center">No history available</p>
          )}
          {history.map((item, i) => (
            <div
              key={i}
              className="border-l-4 border-indigo-500 p-4 mb-4 rounded-lg hover:shadow-lg transition bg-gray-50"
            >
              <p>
                <span className="font-semibold">From:</span> {item.sender}
              </p>
              <p>
                <span className="font-semibold">Subject:</span> {item.subject}
              </p>
              <p className="text-gray-700 my-1">{item.body}</p>
              <p className="text-sm text-gray-500">
                {item.recipients.length} recipients
              </p>
              <p
                className={`font-semibold ${
                  item.status === "Sent" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;