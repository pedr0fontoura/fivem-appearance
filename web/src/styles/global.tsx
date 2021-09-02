import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Inter', sans-serif;
  }
  
  body {
    background: transparent;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    /* background: url('https://cdn.discordapp.com/attachments/694641187901931601/786575235734437938/unknown.png'); */
  }

  button {
    cursor: pointer;
    outline: 0;
  }
`;
