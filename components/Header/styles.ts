import styled from 'styled-components';

const StyledNav = styled.div`
  background-color: #f8f9fa;

  nav {
    max-width: 1200px;
    margin: auto;
    background: none !important; /* No choice to overwrite bootstrap */
  }

  .navbar-brand {
    text-transform: uppercase;
    letter-spacing: 0.25em;
  }

  .logged-out {
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .navbar-collapse {
    &.collapse,
    &.collapsing {
      text-align: center !important;
    }
  }
`;

export default StyledNav;
