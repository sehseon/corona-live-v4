import React, { useState } from "react";

import { rem } from "polished";

import useApi from "@hooks/useApi";
import VaccinApi from "@apis/vaccine-api";
import { styled } from "@styles/stitches.config";

import Section from "@components/Section";
import { Tab, Tabs } from "@components/Tabs";

import type { VaccineType } from "@_types/vaccine-type";

const VaccineInfo: React.FC = () => {
  const [vaccineType, setVaccineType] = useState<VaccineType>("pfizer");
  const { data } = useApi(VaccinApi.info);

  return (
    <Wrapper>
      <Tabs
        value={vaccineType}
        onChange={setVaccineType}
        tabIndicatorType="contained"
      >
        <Tab value="pfizer" text="화이자" />
        <Tab value="moderna" text="모더나" />
        <Tab value="jansen" text="얀센" />
        <Tab value="astrazeneca" text="AZ" />
      </Tabs>
      <Container>
        {data[vaccineType].map(([label, content], index) => (
          <Info key={index}>
            <InfoLabel>{label}</InfoLabel>
            <InfoValue dangerouslySetInnerHTML={{ __html: content }} />
          </Info>
        ))}
      </Container>
    </Wrapper>
  );
};

export const VaccineInfoSkeleton = () => {
  return <Wrapper css={{ height: rem(310) }}></Wrapper>;
};

const Wrapper = styled(Section, {
  padding: rem(20),
});

const Container = styled("div", {
  column: true,
  paddingY: rem(6),
});

const Info = styled("div", {
  rowCenteredY: true,
  paddingX: rem(8),
  marginTop: rem(16),
});

const InfoLabel = styled("div", {
  body1: true,

  minWidth: rem(90),
  color: "$gray700",
});

const InfoValue = styled("div", {
  body1: true,
});

export default VaccineInfo;
