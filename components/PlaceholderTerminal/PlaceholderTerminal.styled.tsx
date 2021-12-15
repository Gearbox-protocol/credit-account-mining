import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const BackgroundVideo = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const AbsoluteBlock = styled.div`
  position: absolute;
  width: 100%;
  bottom: 60px;
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 100%;
  justify-content: center;
`;

const TextBlock = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex: 1 0 100%;
  justify-content: center;
`;

const Text = styled.h2`
  margin-bottom: 0;
  max-width: 480px;
  font-size: 28px;
  text-align: center;
`;

export { Container, BackgroundVideo, AbsoluteBlock, TextBlock, Text };
