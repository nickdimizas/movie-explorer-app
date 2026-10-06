import { MainLayout } from "./components/layout/MainLayout";
import { MovieSearchContainer } from "./components/movies/MovieSearchContainer";

const App = () => {
  return (
    <MainLayout>
      <MovieSearchContainer />
    </MainLayout>
  );
};

export default App;
