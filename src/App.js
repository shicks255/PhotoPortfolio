import React from 'react';
import Body from './components/Body';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

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

            <footer className={'footer'}>
                &copy;&nbsp;<a target={'_blank'} rel="noopener" href={'https://shicks255.com'}>Steven Hicks</a>
            </footer>

        </div>
    );
}

export default App;
