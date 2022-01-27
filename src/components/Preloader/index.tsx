import * as S from './styles';

const Preloader = () => (
  <S.Wrapper>
    <S.ContentPreloader>
      {new Array(25).fill(null).map((_, index) => (
        <li key={index} aria-label="box" />
      ))}
    </S.ContentPreloader>
  </S.Wrapper>
);

export default Preloader;
