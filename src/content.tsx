import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";

function Main() {
    return (
        <Frame id="project-nifty-root" style={{ display: "block" }} head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
            <FrameContextConsumer>
                {
                    // Callback is invoked with iframe's window and document instances
                    ({ document, window }) => {
                        // Render Children
                        return (
                            <div className='project-nifty'>
                                <h1>Hello world - My first Extension</h1>
                                <ul>
                                    <li>1</li>
                                    <li>2</li>
                                </ul>
                            </div>
                        )
                    }
                }
            </FrameContextConsumer>
        </Frame>
    )
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Main />, app);