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
    third: '#5867dd',
    dark: '#353540',
  },
};

export const globalStyles = `
  
  @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600');
  
  html {
    box-sizing: border-box;
    font-size: 16px;

    @media (max-width: 500px) {
      font-size: 12px;
    }
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
    transition: text-decoration 0s;

    svg {
      margin-right: 0.4rem;
      margin-top: -2px;
    }

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
      text-transform: uppercase;

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

    &-warning {
      text-transform: uppercase;
    }
  }

  .dropdown {
    &.show > .btn.dropdown-toggle {
      background: ${theme.colors.secondary};
      color: black;

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    .dropdown-item {
      padding: 0.25rem 1rem;
      font-size: 0.75rem;
      font-weight: lighter;

      &:active {
        background: ${theme.colors.primary};
      }
    }

    .dropdown-menu {
      border: none;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.07);
    }
  }

  .card {
    border: none;
    box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
  }
  @media print {
    .noPrint {
      display: none;
    }
  }
  .breadcrumb {
    background: none;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }
  .kep-login-facebook.metro {
    width: 100%;
    width: 100%;
    border-radius: 0.25rem !important;
    font-size: .75rem;
    padding: .55rem .75rem;
  }
  .google-login-btn {
    width: 100%;
    justify-content: center;
    margin: 1rem 0;
  }
`;
