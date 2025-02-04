import { styled } from "@mui/material/styles";

export const Container = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ColumnContainer = styled("div")`
  flex: 1;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-right: 0.5px solid #bdbdbd;
`;

export const Section = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled("div")`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: #3d3d3d;
  font-family: "Inter", sans-serif;
`;

export const SectionLabel = styled("div")`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #3d3d3d;
  font-family: "Inter", sans-serif;
`;

export const Row = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const LinkButton = styled("div")`
  color: #517d89;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  cursor: pointer;
`;

export const Status = styled("span")`
  color: #989898;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
