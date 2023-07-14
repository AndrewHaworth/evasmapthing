import logo from "./logo.svg";
import "./App.css";
import { ReactElement, ReactNode, useReducer } from "react";
import aos from "aos";
import "aos/dist/aos.css";
import Map from "./Map";
import handleViewport from "react-in-viewport";

// https://github.com/d3/d3-transition
// https://observablehq.com/@clhenrick/implementing-an-svg-zoom-animation-without-a-d3-transition

aos.init({
  offset: 100
});

function App() {
  const [{ width, height, zoom }, reducer] = useReducer(
    (
      state: { width: number; height: number; zoom: number },
      action: Partial<{ width: number; height: number; zoom: number }>
    ) => ({
      ...state,
      ...action
    }),
    {
      width: 100,
      height: 100,
      zoom: 1
    }
  );

  const handleScroll = () => {
    // const bottom =
    //   target.scrollHeight - target.scrollTop === target.clientHeight;
    // console.log("bottom", bottom);
    // if (bottom) {
    reducer({ width: 200, height: 200, zoom: 2 });
    // }
  };

  const Block = (props: any): ReactElement => {
    const { inViewport, forwardedRef } = props;
    return (
      <div style={{ gridArea: "footer" }} id="trigger-zoom" ref={forwardedRef}>
        BOTTOM
      </div>
    );
  };

  const ViewportBlock = handleViewport(Block);
  return (
    <>
      <button onClick={() => reducer({ zoom: 1 })}>
        {"click me to reset! :)"}
      </button>
      <div
        style={{
          position: "sticky",
          top: 0,
          transition: "1s",
          zIndex: -1000,
          overflow: "hidden"
        }}
        data-aos="fade-left"
        data-aos-anchor="#trigger-right"
      >
        <Map width={width} height={height} zoom={zoom} />
      </div>
      <div style={{ height: 2000 }} className="App">
        <div>TEST TEST</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridTemplateRows: "auto",
            gridTemplateAreas: `"header header header header" "main main main sidebar" "footer footer footer footer"`,
            height: "30%"
          }}
        >
          <div style={{ gridArea: "header" }} id="trigger-map">
            top!!
          </div>
          <div data-aos="fade-down" style={{ gridArea: "main" }}>
            HI THERE IM EVA I LIKE TO RIDE BICYCLES ON SUNDAY MORNING
          </div>
          <img
            style={{ gridArea: "sidebar" }}
            data-aos="fade-left"
            data-aos-anchor="#trigger-map"
            src="https://avatars.githubusercontent.com/u/68220184?v=4"
          />
        </div>
        <ViewportBlock
          onEnterViewport={handleScroll}
          onLeaveViewport={() => console.log("leave")}
        />
      </div>
    </>
  );
}

export default App;
