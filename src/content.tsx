import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";
import { useRef, useState } from 'react';


const Main = (props: any) => {
    const frameWindow = useRef<Window>();
    const frameDocument = useRef<Document>();
    const [height, setHeight] = useState<number | string>(100);
    const [width, setWidth] = useState<number | string>(100);

    const getInnerHTML = () => {
        const iframeWindow = frameWindow.current;
        if (!iframeWindow) return;
        const iframeDocument = frameDocument.current;
        if (!iframeDocument) return;

        if (frameDocument.current) {
            const frameRootEl = frameDocument.current.getElementsByClassName("frame-root")[0] as HTMLElement;

            const height = frameRootEl.offsetHeight;
            const width = frameRootEl.offsetWidth;
            setHeight(height);
            setWidth(width);
        }
    };

    return (
        <Frame onClick={getInnerHTML} id="project-nifty-root" style={{ height: height, width: width }} head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
            <FrameContextConsumer>
                {(frameContext) => {
                    const { document, window } = frameContext;
                    frameWindow.current = window;
                    frameDocument.current = document;

                    return (
                        <div className='project-nifty'>
                            <h1>Hello world - My first Extension</h1>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                            </ul>
                        </div>
                    )
                }}
            </FrameContextConsumer>
        </Frame>
    )
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Main />, app)

// const parent = app.parentNode;

// if (parent) {
//     const oldChildren = Array.from(parent.childNodes);

//     ReactDOM.render(
//         <Main />,
//         parent as HTMLElement,
//         () => {
//             const newChildren = Array.from(parent.childNodes);
//             parent.replaceChildren(...oldChildren);
//             app.replaceWith(...Array.from(newChildren));
//         }
//     )
// }

const root = document.getElementById("project-nifty-root");
if (root)
    root.style.display = "none";
