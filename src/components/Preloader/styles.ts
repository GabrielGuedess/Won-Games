import styled, { css, keyframes } from 'styled-components';

const rot = keyframes`
  100% {
        transform: rotate(360deg);
  }
`;

const scale = keyframes`
  100% {
      transform: scale(.1);
      opacity: 0;
    }
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 10rem 0 10rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentPreloader = styled.ul`
  ${({ theme }) => css`
    width: 10rem;
    height: 10rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    animation: ${rot} 16s linear infinite;

    li {
      width: 2rem;
      height: 2rem;
      background: ${theme.colors.primary};
      border-radius: 0.4rem;
      list-style: none;
      box-shadow: 0 0 0.1rem #fff, 0 0 0.5rem ${theme.colors.primary},
        0 0 1rem ${theme.colors.primary}, 0 0 1.5rem ${theme.colors.primary},
        0 0 2.5rem ${theme.colors.primary}, 0 0 5.5rem ${theme.colors.primary};
      animation: ${scale} 0.8s linear alternate infinite;

      ${createCSS()}
      ${gg([1, 6, 11, 16, 21], 0)}
      ${gg([7, 12, 17, 22], 0.2)}
      ${gg([13, 18, 23], 0.4)}
      ${gg([19, 24], 0.6)}

      &:nth-child(25) {
        animation-delay: 0.9s;
      }
    }
  `}
`;

function gg(list: number[], delay: number) {
  let styles = '';

  for (let i = 0; i < list.length; i += 1) {
    styles += `
      &:nth-child(${list[i]}) {
        animation-delay: ${0.1 * i + delay}s;
      }
    `;
  }

  return css`
    ${styles}
  `;
}

function createCSS() {
  let styles = '';

  for (let i = 1; i <= 25; i += 1) {
    styles += `
      &:nth-child(${i}) {
        z-index: ${25 - i};
      }
    `;
  }

  for (let i = 1; i <= 5; i += 1) {
    styles += `
      &:nth-child(${i}) {
        animation-delay: ${0.1 * i}s;
      }

      &:nth-child(${i + 6}) {
        ${i < 5 && `animation-delay: ${0.1 * i + 0.2}s;`}
      }

      &:nth-child(${i + 12}) {
        ${i < 4 && `animation-delay: ${0.1 * i + 0.4}s;`}
      }

      &:nth-child(${i + 18}) {
        ${i < 3 && `animation-delay: ${0.1 * i + 0.6}s;`}
      }

      &:nth-child(${i + 23}) {
        ${i < 2 && `animation-delay: ${0.1 * i + 0.8}s;`}
      }
    `;
  }

  return css`
    ${styles}
  `;
}
