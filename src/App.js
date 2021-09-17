import { useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";

export default function App() {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <Searchbar onSubmit={setValue} />
      <ImageGallery value={value} />
    </div>
  );
}
