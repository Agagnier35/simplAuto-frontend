import styled from 'styled-components';

const StyledNav = styled.div`
  background-color: ${props => props.theme.colors.dark};
  display: flex;
  position: relative;

  nav {
    width: 100%;
    max-width: 900px;
    background: none !important; /* No choice to overwrite bootstrap */
    padding: 0;
    margin: 10.5px auto;
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
    font-size: 1.35rem;

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

      &.firstName {
        margin: 0 1rem;
        color: white;
      }

      &.nav-item {
        margin: 0 0.5rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }
    }

    &.collapse,
    &.collapsing {
      text-align: center !important;
    }

    &.collapsing,
    &.collapse.show {
      .btn-primary {
        margin-top: 1rem;
      }

      .logged-out {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 0;
        transition: none;

        a {
          font-size: 1.25rem;
        }

        span {
          display: none;
        }
      }
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
