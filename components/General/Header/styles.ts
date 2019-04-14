import styled from 'styled-components';

const StyledNav = styled.div`
  background-color: ${props => props.theme.colors.dark};
  display: flex;
  position: absolute !important;
  top: 0;
  min-height: 72.5px;
  width: 100%;
  z-index: 99;

  @media (max-width: 767px) {
    & > a {
      position: absolute;
      height: 72.5px;
    }
  }

  nav {
    width: 100%;
    max-width: 900px;
    background: none !important; /* No choice to overwrite bootstrap */
    padding: 0;
    margin: 10.5px auto;
  }

  .navbar-nav {
    align-items: center;
    flex-grow: 1;
    margin-right: 1rem !important;

    @media (max-width: 767px) {
      margin-right: auto !important;
    }
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

    @media (max-width: 767px) {
      font-size: 25px;
      margin-top: 70px;
    }

    a {
      color: ${props => props.theme.colors.primary};

      &.firstName {
        background: ${props => props.theme.colors.primary};
        color: white;
        font-size: 1rem;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        margin-right: 1rem;
        margin-left: auto;

        @media (max-width: 767px) {
          margin-left: 1rem;
          margin-bottom: 1rem;
          margin-top: 1rem;
        }
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
