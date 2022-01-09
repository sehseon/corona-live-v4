import React from "react";

import { rem } from "polished";

import { css } from "@styles/stitches.config";

import Row from "@components/Row";
import { Tab, TabProps, Tabs } from "@components/Tabs";

interface Props<T extends string> {
  values: Record<T, string>;
  onChange: (optionName: string, value: T) => void;
  optionList: Record<T, Array<TabProps>>;
}

const ChartOptionTabs = <T extends string>(props: Props<T>) => {
  const { values, onChange, optionList } = props;
  return (
    <Row css={{ width: "100%", justifyContent: "space-between" }}>
      {(Object.keys(optionList) as T[]).map((subOptionName) => {
        const subOption = optionList[subOptionName];
        return (
          <Tabs
            {...{
              css: tabsCss,
              tabCss,
              tabTextCss,
              tabIndicatorCss,
              activeTabTextCss,
            }}
            key={subOptionName}
            value={values[subOptionName]}
            onChange={(value) => onChange(subOptionName, value as T)}
            tabIndicatorType="contained"
          >
            {subOption.map((tab) => (
              <Tab key={tab.value} {...tab} />
            ))}
          </Tabs>
        );
      })}
    </Row>
  );
};

const tabsCss = css({
  background: "$gray100",
  borderRadius: rem(8),
});

const tabCss = css({
  height: rem(36),
  rowCentered: true,
  padding: 0,
  paddingX: rem(10),
  borderRadius: rem(8),

  "@md": {
    paddingX: rem(14),
  },
});

const tabTextCss = css({
  body3: true,

  color: "$gray900",
  textAlign: "centre",
  opacity: 0.8,

  "@md": {
    body1: true,
  },
});

const activeTabTextCss = css({
  body3: true,
  fontWeight: 700,
  color: "$gray900",

  "@md": {
    subtitle2: true,
  },
});

const tabIndicatorCss = css({
  boxShadow: "$subSectionBoxShadow",
  background: "$shadowBackground2",
  transform: "scale(0.9,0.8)",
  borderRadius: rem(8),
  border: `${rem(1)} solid $chartOptionBorder`,
});

export default ChartOptionTabs;
