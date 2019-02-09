export const theme = {
  maxWidth: '1200px',
  colors: {
    primary: '#1cac81',
    primaryLighter: '#80c3af',
    primaryDarker: '#178b68',
    secondary: '#f4f4f8',
    secondaryDarker: '#aeb2b7',
    secondaryHighlight: '#fd397a',
    secondaryHighlightDarker: '#fd1361',
  },
};

export const globalStyles = `
  
  @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600');

  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1rem;
    line-height: 2;
    font-family: 'Poppins', sans-serif;
    
    * {
      letter-spacing: 0.05em;
    }
  }

  button:hover {
    cursor: pointer;
  }

  .btn {
    font-size: .75rem;
    padding: .55rem .75rem;

    &-lg {
      padding: 0.75rem 1rem;
      font-size: 1.25rem;
    }

    &:disabled {
      background: ${theme.colors.secondary};
      color: ${theme.colors.secondaryDarker};

      &:hover {
        background: ${theme.colors.secondary};
        color: ${theme.colors.secondaryDarker};
        cursor: not-allowed;
      }
    }
    
    &-primary {
      background: ${theme.colors.primary};
      color: white;
      border: none;
      text-transform: uppercase;

      &:hover {
        background: ${theme.colors.primaryDarker};
      }
    }

    &-secondary {
      background: ${theme.colors.secondary};
      color: black;
      border: none;

      &:hover {
        background: ${theme.colors.primary};
      }
    }

    &-success {
      background: ${theme.colors.secondary};
      color: ${theme.colors.primary};
      border: none;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.25rem .75rem;
      letter-spacing: 0.15em;

      &:hover {
        background: ${theme.colors.primary};
      }
    }

    &-info {
      background: transparent;
      border: 1px solid ${theme.colors.secondary};
      color: ${theme.colors.secondaryDarker};
      text-transform: uppercase;

      &:hover {
        background: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
      }
    }

    &-danger {
      background: ${theme.colors.secondaryHighlight};
      border: none;

      &:hover {
        background: ${theme.colors.secondaryHighlightDarker};
      }
    }

    &-light {
      color: ${theme.colors.primaryLighter};
      text-transform: uppercase;
      background: none;
      border: none;

      &:hover {
        background: ${theme.colors.secondary};
        color: ${theme.colors.primary};
      }
    }
  }
`;
