import { PropsWithChildren } from 'react';
import StyledBlock from './Block.styled';

type BlockVariants = 'viewport-sized';

interface IBlockProps {
  variant: BlockVariants;
}

function Block({ variant, children }: PropsWithChildren<IBlockProps>) {
  return <StyledBlock variant={variant}>{children}</StyledBlock>;
}

export type { IBlockProps, BlockVariants };
export default Block;
