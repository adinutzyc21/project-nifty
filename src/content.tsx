import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";
import { useRef, useState, useLayoutEffect, useEffect } from 'react';

import Moveable from "react-moveable";
import MoveableHelper from "moveable-helper";

function Main() {
    const [clicked, setClicked] = useState<boolean>(false);
    const frameWindow = useRef<Window>();
    const frameDocument = useRef<Document>();
    const [height, setHeight] = useState<number | string>(100);
    const [width, setWidth] = useState<number | string>(100);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [target, setTarget] = useState<HTMLElement>();
    const [zoom, setZoom] = useState(1);
    const [helper] = useState(() => new MoveableHelper());

    const getInnerHTML = () => {
        if (clicked) return;
        console.log("clicked")
        setClicked(true)

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

    useLayoutEffect(() => {
        if (!iframeRef || !iframeRef.current) return;
        const { contentWindow } = iframeRef.current;
        if (contentWindow) {
            const document = contentWindow.document;
            const targ = document.querySelector("#project-nifty-root") as HTMLElement;
            if (targ) {
                setTarget(targ);
            }
        }
    }, [iframeRef.current]);

    return (
        <div className="container">
            <Frame ref={iframeRef} onClick={getInnerHTML} id="project-nifty-root" style={{ height: height, width: width }} head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
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
            <Moveable
                target={target}
                draggable
                dragArea
                onDragStart={helper.onDragStart}
                onDrag={helper.onDrag}
                zoom={1 / zoom}
            />
        </div>
    );
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Main />, app)


const root = document.getElementById("project-nifty-root");
if (root)
    root.style.display = "none";
