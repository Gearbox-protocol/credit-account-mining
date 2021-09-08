import React from 'react';
import dynamic from 'next/dynamic';
// import fs from 'fs'; !!!!!!!!!!!
import { GetStaticProps } from 'next';
import { useSelector } from 'react-redux';
import accounts from 'utils/accounts/accounts';
import { constructAccountList } from 'utils/helpers/helpers';
import { IState } from 'redux/root/rootReducer';
import Layout from 'components/Layout/Layout';
import FadingSwitcher from 'components/FadingSwitcher/FadingSwitcher';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';

const TerminalController = dynamic(
  () => import('components/TerminalController/TerminalController'),
  { ssr: false },
);

interface IIndexProps {
  error?: string;
}

const Index: React.FC<IIndexProps> = ({ error }) => {
  const { playVideo } = useSelector((state: IState) => state.terminalApp);

  return (
    <Layout
      layoutParams={{
        title: 'Gearbox',
        description: 'Gearbox-terminal main page',
        keyWords: 'Gearbox, crypto',
        url: 'http://landing-test.gearbox.finance',
      }}
    >
      <FadingSwitcher isTransition={playVideo} transitionDuration={2000}>
        <TerminalController />
        <VideoPlayer src="https://www.youtube.com/embed/c6-L_3GMBxs" />
      </FadingSwitcher>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [userListRawRoute, userListTargetRoute] = [
      process.env.USER_LIST_RAW_ROUTE,
      process.env.USER_LIST_TARGET_ROUTE,
    ];
    if (!userListRawRoute || !userListTargetRoute) throw new Error('Routes not specified');

    const [userList, root] = constructAccountList(accounts);

    // const someData = [{ name: 'adman', tag: 'batsman', age: 25 }]; !!!!!!!!!!!
    // const jsonData = JSON.stringify(someData); !!!!!!!!!!!
    // const codeStr = `const cricketers = ${jsonData}; export { cricketers };`; !!!!!!!!!!!
    // fs.writeFileSync('someFile.ts', codeStr, 'utf8'); !!!!!!!!!!!

    return { props: { error: null } };
  } catch (e: any) {
    const props: IIndexProps = { error: e.message };
    return { props };
  }
};

export default Index;
