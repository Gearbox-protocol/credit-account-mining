import styled from 'styled-components';
import { BlockVariants } from 'components/Block/Block';

const Block = styled.section<{ variant?: BlockVariants }>`
  height: ${({ variant }) => {
    switch (variant) {
      case 'viewport-sized':
        return '100vh';
      default:
        return 'auto';
    }
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Block;
