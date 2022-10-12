import styled from '@emotion/styled';

type ColorTypes = { isDragAccept: boolean; isDragReject: boolean; isFocused: boolean };

const getColor = (props: ColorTypes) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

export const DragAndDropWrapper = styled.div<ColorTypes>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-color: ${(props) => getColor(props)};
  position: relative;
  min-height: 500px;
`;

export const WrapperFocused = styled.div`
  position: absolute;
  background-color: #ebf8ff;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  border: 1px solid #2d80e1;
  top: 0;
`;

export const WrapperIconAndButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 3rem;
`;

export const CustomButton = styled.div`
  width: 230px;
  height: 83px;
  background-color: #489cff;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
