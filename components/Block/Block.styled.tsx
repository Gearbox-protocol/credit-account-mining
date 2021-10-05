import styled from 'styled-components';
import { BlockVariants } from 'components/Block/Block';

const Block = styled.section<{ variant?: BlockVariants }>`
  display: flex;
  flex-wrap: wrap;
  height: ${({ variant }) => {
    switch (variant) {
      case 'viewport-sized':
        return '100vh';
      default:
        return 'auto';
    }
  }};
  justify-content: center;
  align-items: center;
`;

export default Block;
