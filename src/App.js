import React from 'react';
import logo from './logo.svg';
import Body from './components/Body';
// import 'jquery/dist/jquery';
// import 'popper.js/dist/popper';
// import 'bootstrap/dist/js/bootstrap.min';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          My Photography Site
      </header>

        <div className={'container'}>
            <Body>

            </Body>
        </div>

        <footer>
            Footer
        </footer>

    </div>
  );
}

export default App;
