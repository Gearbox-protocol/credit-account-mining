import SiteHead, { ISiteHeadProps } from 'components/SiteHead/SiteHead';

import * as Styled from './Layout.styled';

type LayoutProps = {
  layoutParams: ISiteHeadProps;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({
  layoutParams: {
    title, description, keyWords, url,
  },
  children,
}) => (
  <>
    <SiteHead title={title} description={description} keyWords={keyWords} url={url} />
    <Styled.Layout>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Layout>
  </>
);

export type { LayoutProps };
export default Layout;
