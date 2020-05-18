import * as _ from "lodash";

/**
 * elementグループ内から高さが最大のものを返す
 */
export const getGroupHeight = (group: HTMLElement[]) => {
  return _.chain(group)
    .map(d => d.getBoundingClientRect().height)
    .max()
    .value();
};
