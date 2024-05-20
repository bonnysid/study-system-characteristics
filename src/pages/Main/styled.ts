import styled from "styled-components";
import { COLORS } from '@src/utils/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  height: 100%;
`;

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  border-radius: 8px;
  background: ${COLORS.lightGray10};
`;

export const TooltipText = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`;
