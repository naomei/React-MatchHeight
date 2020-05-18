import * as React from "react";
import * as _ from "lodash";
import { getGroupHeight } from "./utils";

/**
 * useMatchHeight
 */
export const useMatchHeight = (
  ref: React.RefObject<HTMLElement>,
  targetClassName: string,
  column: number
) => {
  const matchHeight = React.useCallback(() => {
    const target = ref.current;

    if (!target) {
      return;
    }

    const elements = target.querySelectorAll(
      `.${targetClassName}`
    ) as NodeListOf<HTMLElement>;

    if (!elements.length) {
      return;
    }

    const groups = _.chunk(elements, column);
    const heightList: number[] = [];

    _.each(groups, group => {
      // 次update時に古いheightが残るので、瞬間的にautoで初期化する
      _.each(group, el => {
        el.style.height = "auto";
      });
      heightList.push(getGroupHeight(group));
    });
    _.each(groups, (group, i) => {
      _.each(group, el => {
        el.style.height = `${heightList[i]}px`;
      });
    });
  }, [column, ref, targetClassName]);

  const resize = () => {
    matchHeight();
  };

  React.useEffect(() => {
    matchHeight();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  });
};
