import "./App.css";
import Header from "./components/Header";
import DiaryView from "./components/DiaryView";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <Header />
            <DiaryView />
            <Footer />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
}

export default App;
