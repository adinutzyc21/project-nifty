import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";

function Main() {
    return (
        <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
            <FrameContextConsumer>
                {
                    // Callback is invoked with iframe's window and document instances
                    ({ document, window }) => {
                        // Render Children
                        return (
                            <div className='project-nifty'>
                                <h1>Hello world - My first Extension</h1>
                            </div>
                        )
                    }
                }
            </FrameContextConsumer>
        </Frame>
    )
}

const app = document.createElement('div');
app.id = "project-nifty-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
app.style.display = "none";