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

            <div className={'myModal'}>
                <div className={'modalImageContainer'}>
                    <div className={'modalLeft'}>
                        <span className={"previous carousel-control-prev-icon"} aria-hidden="true"></span>
                    </div>
                    <img className={'modalImage'} src={'/image/frontenac.jpg'} style={{ maxWidth: "1250px" }}/>
                    <div className={'modalRight'}>
                        <span className={"next carousel-control-next-icon"} aria-hidden="true"></span>
                    </div>
                </div>
            </div>

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
