import React from 'react';
import Body from './components/Body';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

function App() {
  return (
    <div className="App">
      <header className="jumbotron jumbotron-fluid">

          <div className={'myModal'}>
              <div className={'modalHolder'}>
                  <img className={'modalImage'} src={'/image/frontenac.jpg'} style={{ maxWidth: "1080px" }}/>
              </div>
          </div>

          <div className={"container"}>
              <h4>
                  My Photography Site
              </h4>
        </div>
      </header>

      <div className={'container'}>
        <Body />
      </div>

      <footer>
        Footer
      </footer>

    </div>
  );
}

export default App;
