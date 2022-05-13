import BookList from "./components/booklist.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header.component";
import EditBook from "./components/editbook.component";
import AddBook from "./components/addbook.component";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/add" element={<AddBook/>}/>
              <Route path="/edit/:id" element={<EditBook/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
