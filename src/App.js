import React, { useState, useEffect, useMemo } from "react";
import { Container, Box, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { Header, ButtonRow } from "./components";
import { useKeyPress } from "./hooks";

const originalText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
in reprehenderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const colors = [
  "#2e97df",
  "#00be9b",
  "#9c55b7",
  "#2e3f50",
  "#f1c40e",
  "#e74d3d",
  "#27af60",
];

const items = [
  { key: "person", id: "PER", text: "Person", color: colors[0] },
  { key: "organisation", id: "ORG", text: "Organisation", color: colors[1] },
  { key: "location", id: "LOC", text: "Location", color: colors[2] },
];

export const App = () => {
  const [state, setState] = useState({});
  const [activeKey, setActiveKey] = useState(false);
  const [_, pressedKey] = useKeyPress(["1", "2", "3", "4", "5"]);

  useEffect(() => {
    if (pressedKey) {
      setActiveKey(Number(pressedKey));
    }
  }, [pressedKey]);

  const handleSelection = () => {
    const selection = window.getSelection();
    const selectionStartIdx = selection.anchorOffset;
    const selectionEndIdx = selection.extentOffset;

    const findSpaceIdx = (text, idx, diff = 1) => {
      const normalisedText = text.replace(/[\r\n]/g, " ");
      let spaceIdx = false;
      while (spaceIdx === false) {
        const letter = normalisedText.slice(idx, idx + 1);
        if (letter === " ") {
          spaceIdx = idx;
        }
        idx += diff;
        if (idx >= normalisedText.length) {
          spaceIdx = idx;
        }
        if (idx < 0 && diff == -1) {
          spaceIdx = idx;
        }
      }
      return spaceIdx;
    };

    const originalTextSection = originalText.slice(
      originalText.indexOf(selection.anchorNode.data)
    );
    const startIdx = findSpaceIdx(
      selection.anchorNode.data,
      selectionStartIdx,
      -1
    );
    const endIdx = findSpaceIdx(selection.anchorNode.data, selectionEndIdx);

    const offsetLength = originalText.replace(originalTextSection, "").length;
    const selectedWord = originalText.slice(
      offsetLength + startIdx + 1,
      offsetLength + endIdx
    );

    if (activeKey) {
      setState((x) => ({ ...x, [selectedWord]: activeKey }));
    }
    selection.removeAllRanges();
  };

  const inlineText = Object.keys(state).reduce((text, key) => {
    return text.replace(
      key,
      `<span style="background-color:${colors[state[key] - 1]}">${key}</span>`
    );
  }, originalText);

  console.log(state);

  return (
    <>
      <Header />
      <Box mt={4} mb={2}>
        <Container maxWidth="md">
          <ButtonRow activeKey={activeKey} items={items} />
          <Paper elevation={0}>
            <Box p={3}>
              <p
                className="input-paragraph"
                onMouseUp={handleSelection}
                dangerouslySetInnerHTML={{ __html: inlineText }}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
      <Container maxWidth="md" className="pagination-container">
        <Pagination count={10} page={1} />
      </Container>
    </>
  );
};
