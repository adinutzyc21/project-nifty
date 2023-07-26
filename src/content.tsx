import React from 'react';
import ReactDOM from 'react-dom';
import "./content.css";

class Main extends React.Component {
    render() {
        return (
            <div className={'project-nifty'}>
                <h1>Hello world - My first Extension</h1>
            </div>
        )
    }
}

const app = document.createElement('div');
app.id = "project-nifty-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
app.style.display = "none";