import React from 'react';
import ReactDom from 'react-dom';
import Game from "./components/Game";


function render(Component) {
    ReactDom.render(
        <Component />,
        document.getElementById('app')
    );
}

if (module.hot) {
    if (module.hot) {
        module.hot.accept('./components/Game', () => {
            render(require('./components/Game').App)
        });
    }
}

render(Game);
