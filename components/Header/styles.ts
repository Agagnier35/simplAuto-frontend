import styled from 'styled-components';

const StyledNav = styled.div`
  background-color: ${props => props.theme.colors.dark};
  display: flex;

  nav {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    background: none !important; /* No choice to overwrite bootstrap */
    padding: 0;
  }

  .navbar-brand {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    background: ${props => props.theme.colors.primary};
    padding: 0.5rem 1rem;
    color: white;
    transition: 0.5s ease;
    display: flex;
    align-items: center;
    margin-right: 0;

    &:hover {
      color: white;
      background: ${props => props.theme.colors.primaryDarker};
    }

    svg {
      margin-right: 4px;
    }
  }

  .logged-out {
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .navbar-collapse {
    padding: 0.5rem 1rem;
    color: white;
    font-size: 0.75rem;

    a {
      color: ${props => props.theme.colors.primary};
    }

    &.collapse,
    &.collapsing {
      text-align: center !important;
    }
  }

  .navbar-toggler {
    margin-right: 1rem;
    margin-left: auto;
    background: ${props => props.theme.colors.primary};
    border: none;
  }
`;

export default StyledNav;
