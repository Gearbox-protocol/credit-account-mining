import React from 'react';
import dynamic from 'next/dynamic';
import DisableMobile from 'components/DisableMobile/DisableMobile';
import Block from 'components/Block/Block';

const EmptyTerminal = dynamic(() => import('components/PlaceholderTerminal/PlaceholderTerminal'), {
  ssr: false,
});

function PlaceholderIndex() {
  return (
    <DisableMobile>
      <Block variant="viewport-sized">
        <EmptyTerminal />
      </Block>
    </DisableMobile>
  );
}

export default PlaceholderIndex;
