import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignInPage from "./Pages/SignInPage/SignInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import HomePage from "./Pages/HomePage/HomePage";
import DetailsPage from "./Pages/DetailsPage/DetailsPage";
import WatchPage from "./Pages/WatchPage/WatchPage";
import SearchPage from "./Pages/SearchPage/SearchPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Container position="bottom-center" limit={2}>
          <main>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/home/movies" element={<HomePage type="movies" />} />
              <Route path="/home/series" element={<HomePage type="series" />} />
              <Route path="/details/:id" element={<DetailsPage />} />
              <Route path="/watch/:id" element={<WatchPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
