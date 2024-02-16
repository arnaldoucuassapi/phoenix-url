import { FormEvent, useState } from "react";
import "./styles/App.css";
import { ArrowRightCircle } from "lucide-react";
import { Loader } from "./components/Loader";
import { writeText as writeClipboardText } from '@tauri-apps/api/clipboard';
import { toast } from "sonner";

type shortUrlProps = {
  id: string,
  url: string | null
}

function App() {
  const [url, setUrl] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<shortUrlProps | null>(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = "https://sht.io/";  
  
  function handleSubmit(event: FormEvent | any) {
    event.preventDefault();

    const short = {
      id: "{id}",
      url
    };

    setLoading(true);

    setTimeout(async () => {
      setShortUrl(short);

      await writeClipboardText(baseUrl+short.id);

      setLoading(false);
      toast("Copied "+url);
    }, 2500)
  }

  return (
    <>
      <div className="effect"></div>
      <div className="effect e2"></div>

      <div className="app">
        <h1 className="title">Phoenix</h1>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            onChange={(event) => setUrl(event.target.value)} 
            placeholder="Paste here your url..." 
          />

          <button 
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader /> : <>Run <ArrowRightCircle size={18} /></>}
          </button>
        </form>

        {shortUrl ? 
          <a href="#" className="shortUrl">{baseUrl+shortUrl.id}</a> 
          : 
          <p>Your short url will come out here</p>
        }
      </div>
    </>
  );
}

export default App;
