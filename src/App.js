import React from 'react';
import Body from './components/Body';

function App() {
  return (
    <div className="App">
      <header className="jumbotron jumbotron-fluid">
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
