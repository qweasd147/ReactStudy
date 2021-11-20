import { useCallback, useState } from "react";

interface UseVirtualScroll<T> {
  (args: {
    //ref: HTMLElement;
    itemHeight: number; //아이템 하나당 높이
    itemSize: number; //아이템 표출할 개수
    tolerance: number; //위아래로 아이템 대기 시켜놓을 개수
    minIndex: number;
    maxIndex: number;
    startIndex: number;
    getData(offset: number, limit: number): T[];
  }): [ScrollState<T>, Function];
}

interface ScrollState<T> {
  viewportHeight: number;
  totalHeight: number;
  toleranceHeight: number;
  itemsLimit: number;
  //initialPosition: number;
  //bufferHeight: number;
  contents: ScrollContents<T>;
}

interface ScrollContents<T> {
  items: T[];
  topPaddingHeight: number;
  bottomPaddingHeight: number;
}

const useVirtualScroll: UseVirtualScroll<any> = ({
  itemHeight,
  itemSize,
  tolerance,
  minIndex,
  maxIndex,
  startIndex,
  getData,
}) => {
  const viewportHeight = itemSize * itemHeight;
  const toleranceHeight = tolerance * itemHeight;
  const itemsAbove = startIndex - tolerance - minIndex;
  const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
  const initTopPaddingHeight = itemsAbove * itemHeight;
  const initBottomPaddingHeight = totalHeight - initTopPaddingHeight;
  const itemsLimit = itemSize + 2 * tolerance;

  const [{ topPaddingHeight, bottomPaddingHeight, items }, setScrollData] =
    useState<ScrollContents<any>>({
      topPaddingHeight: itemsAbove * itemHeight,
      bottomPaddingHeight: initBottomPaddingHeight,
      items: [],
    });

  const handleOnScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const scrollTop = e.currentTarget.scrollTop;

      const index =
        minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
      const items = getData(index, itemsLimit);
      const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0);
      const bottomPaddingHeight = Math.max(
        totalHeight - topPaddingHeight - items.length * itemHeight,
        0
      );

      setScrollData({
        topPaddingHeight,
        bottomPaddingHeight,
        items,
      });
    },
    [itemsLimit, itemHeight, getData, minIndex, toleranceHeight, totalHeight]
  );

  return [
    {
      viewportHeight,
      totalHeight,
      toleranceHeight,
      //bufferHeight: viewportHeight + 2 * toleranceHeight,
      //initialPosition: topPaddingHeight + toleranceHeight,
      itemsLimit: itemSize + 2 * tolerance,
      contents: {
        items,
        topPaddingHeight,
        bottomPaddingHeight,
      },
    },
    handleOnScroll,
  ];
};

export default useVirtualScroll;
