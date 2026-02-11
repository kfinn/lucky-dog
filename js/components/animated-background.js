import classNames from "classnames";
import { html } from "htm/react";
import _ from "lodash";
import { useState } from "react";
import { useInterval } from "utils";

const CHARLIE_IMAGE_PATHS = [
  MANTLE_ASSET_URL("images/charlie-1.png"),
  MANTLE_ASSET_URL("images/charlie-2.png"),
  MANTLE_ASSET_URL("images/charlie-3.png"),
  MANTLE_ASSET_URL("images/charlie-4.png"),
  MANTLE_ASSET_URL("images/charlie-5.png"),
  MANTLE_ASSET_URL("images/charlie-6.png"),
  MANTLE_ASSET_URL("images/charlie-7.png"),
  MANTLE_ASSET_URL("images/charlie-8.png"),
  MANTLE_ASSET_URL("images/charlie-9.png"),
];

const CHARLIE_SPAWN_CHANCE_INTERVAL_MS = 250;
const AVERAGE_CHARLIE_SPAWN_INTERVAL_MS = 4000;
const CHARLIE_SPAWN_LIKELIHOOD =
  (4 * CHARLIE_SPAWN_CHANCE_INTERVAL_MS) / AVERAGE_CHARLIE_SPAWN_INTERVAL_MS;
const CHARLIE_APPEARANCE_DURATION_MS = 6000;

const INITIAL_CHARLIES = _.reduce(
  CHARLIE_IMAGE_PATHS,
  (acc, path) => ({ ...acc, [path]: null }),
  {},
);

var nextZIndex = 0;

export default function AnimatedBackground() {
  const [charlies, setCharlies] = useState(INITIAL_CHARLIES);
  useInterval(() => {
    if (Math.random() > CHARLIE_SPAWN_LIKELIHOOD) return;
    setCharlies((oldCharlies) => {
      const now = Date.now();
      const compactedCharlies = _.reduce(
        CHARLIE_IMAGE_PATHS,
        (acc, path) => ({
          ...acc,
          [path]:
            oldCharlies[path] === null ||
            oldCharlies[path].appearedAt <= now - CHARLIE_APPEARANCE_DURATION_MS
              ? null
              : oldCharlies[path],
        }),
        {},
      );

      const activeCharliesCount = _.sumBy(CHARLIE_IMAGE_PATHS, (path) =>
        compactedCharlies[path] !== null ? 1 : 0,
      );
      let inactiveCharlieToActivateIndex = _.random(0, activeCharliesCount);
      _.each(CHARLIE_IMAGE_PATHS, (path, index) => {
        if (compactedCharlies[path] === null) return;
        if (index > inactiveCharlieToActivateIndex) return;
        inactiveCharlieToActivateIndex++;
      });
      return {
        ...compactedCharlies,
        [CHARLIE_IMAGE_PATHS[inactiveCharlieToActivateIndex]]: {
          appearedAt: now,
          className: classNames(
            "absolute",
            "motion-safe:animate-[spinning-appear-and-disappear_6s_linear_1]",
            "motion-reduced:animate-[still-appear-and-disappear_6s_linear_1]",
            "object-contain",
            "w-[30%]",
            "h-[30%]",
            "opacity-0",
          ),
          style: {
            top: `${_.random(0, 70)}%`,
            left: `${_.random(0, 70)}%`,
            zIndex: nextZIndex++,
          },
        },
      };
    });
  }, 250);

  console.log(INITIAL_CHARLIES, charlies);
  return html`<div
    className=${classNames(
      "select-none",
      "fixed",
      "inset-0",
      "-z-1",
      "bg-conic-[red,orange,yellow,green,blue,indigo,violet,red,orange,yellow,green,blue,indigo,violet,red,orange,yellow,green,blue,indigo,violet,red,orange,yellow,green,blue,indigo,violet,red,orange,yellow,green,blue,indigo,violet,red]",
      "bg-size-[700%_700%]",
      "motion-safe:animate-[rotating-background_20s_linear_infinite]",
      "motion-reduce:bg-top-left",
    )}
  >
    ${_.map(CHARLIE_IMAGE_PATHS, (path) => {
      console.log(path, charlies[path]);
      return (
        charlies[path] !== null &&
        html`<img
          key=${path}
          src=${path}
          className=${charlies[path].className}
          style=${charlies[path].style}
        />`
      );
    })}
  </div>`;
}
