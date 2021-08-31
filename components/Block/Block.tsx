import StyledBlock from './Block.styled';

type BlockVariants = 'viewport-sized';

interface IBlockProps {
  variant: BlockVariants;
  children: React.ReactNode;
}

const Block: React.FC<IBlockProps> = ({ variant, children }) => (
  <StyledBlock variant={variant}>{children}</StyledBlock>
);

export type { IBlockProps, BlockVariants };
export default Block;
