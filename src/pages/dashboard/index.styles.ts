import styled from '@emotion/styled';

export const Wrapper = styled.div``;

export const PaddedWrapper = styled.div`
  padding: 2rem;
`;

export const DashboardStyled = styled.div`
  padding-left: 3rem;
  padding-right: 0rem;
  padding-top: 0.5rem;

  @media (max-width: 900px) {
    padding: 1rem 0;
  }
`;

export const MobileHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  padding: 2rem;
`;

export const MobileHeaderItem = styled.div`
  flex: 0 0 47%;
`;
