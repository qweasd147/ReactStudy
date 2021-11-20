import { useCallback, useEffect, useRef } from "react";
import useVirtualScroll from "../hooks/useVirtualScroll";

const VirtualScroll = () => {
  const viewportRef = useRef(null);

  useEffect(function firstScrollTrigger() {
    const scrollTrigger = new MouseEvent("scroll", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    (viewportRef.current as any).dispatchEvent(scrollTrigger);
  }, []);

  const options = {
    itemHeight: 20, //아이템 하나당 높이
    itemSize: 10, //아이템 표출할 개수
    tolerance: 5, //위아래로 아이템 대기 시켜놓을 개수
    minIndex: 0,
    maxIndex: 10000,
    startIndex: 1,
  };

  const getData = useCallback(
    (offset: number, limit: number) => {
      const start = Math.max(options.minIndex, offset);
      const end = Math.min(offset + limit - 1, options.maxIndex);

      return Array.from({ length: end - start + 1 }, (v, i) => {
        const idx = start + i;
        return {
          index: idx,
          text: `item ${idx}`,
        };
      });
    },
    [options.minIndex, options.maxIndex]
  );

  const [
    {
      viewportHeight,
      contents: { topPaddingHeight, bottomPaddingHeight, items },
    },
    handleScroll,
  ] = useVirtualScroll({
    ...options,
    getData,
  });

  return (
    <div
      className="viewport"
      ref={viewportRef}
      onScroll={(e) => handleScroll(e)}
      style={{
        height: viewportHeight,
        width: "150px",
        overflowY: "scroll",
        border: "1px solid red",
        margin: "0 auto",
      }}
    >
      <div style={{ height: topPaddingHeight }}></div>
      {items.map(({ index, text }) => {
        return (
          <div
            className="item"
            key={`item-key-${index}`}
            style={{ height: "20px" }}
          >
            {text}
          </div>
        );
      })}
      <div style={{ height: bottomPaddingHeight }}></div>
    </div>
  );
};

export default VirtualScroll;
