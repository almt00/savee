import { styled } from '@stitches/react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';
  return (
    <button
      type='button'
      className={['storybook-button', `storybook-button--${size}`, mode].join(
        ' '
      )}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};

// const Button = styled("button", {
//   // default: medium primary
//   borderRadius: "12px",
//   backgroundColor: "$white",
//   color: "$black",
//   fontSize: "$small",
//   fontWeight: "$bold",
//   padding: "0.4rem 0.75rem",
//   border: "1px solid $black",
//   "&:focus-visible": {
//     border: "2px solid $links",
//   },
//   "&:hover:enabled": {
//     backgroundColor: "$border",
//   },
//   "&:disabled": {
//     border: "1px solid $muted",
//     color: "$muted",
//   },

//   variants: {
//     size: {
//       md: {
//         padding: "0.4rem 0.75rem",
//       },
//       lg: {
//         fontSize: "$normal",
//         fontWeight: "$bolder",
//         padding: "0.6rem 1rem",
//       },
//       sm: {
//         padding: "0.3rem 0.5rem",
//       },
//     },
//     bg: {
//       primary: {
//         backgroundColor: "$white",
//         border: "1px solid $black",
//         color: "$black",
//       },
//       secondary: {
//         backgroundColor: "transparent",
//         border: "1px solid $border",
//         color: "$links",
//         "&:focus-visible": {
//           border: "2px solid $links",
//           backgroundColor: "transparent",
//         },
//         "&:hover:enabled": {
//           color: "$white",
//           backgroundColor: "$links",
//         },
//         "&:disabled": {
//           color: "$links",
//           opacity: 0.5,
//           border: "1px solid $border",
//         },
//       },
//       transparent: {
//         backgroundColor: "transparent",
//         border: "0px",
//         color: "$links",
//         "&:disabled": {
//           border: "none",
//           backgroundColor: "$white",
//           color: "$muted",
//         },
//       },
//       solid: {
//         backgroundColor: "$success",
//         border: "0px",
//         color: "$white",
//         "&[type=submit]": {
//           backgroundColor: "$success",
//           border: "0px",
//           color: "$white",
//         },
//         "&:hover:enabled": {
//           backgroundColor: "#2A824E",
//         },
//         "&:disabled": {
//           backgroundColor: "$success",
//           opacity: 0.5,
//           color: "$white",
//           border: "none",
//         },
//       },
//       danger: {
//         backgroundColor: "$danger",
//         border: "0px",
//         color: "$white",
//         "&:hover:enabled": {
//           backgroundColor: "#AB2A2A",
//         },
//         "&:disabled": {
//           backgroundColor: "$danger",
//           opacity: 0.5,
//           color: "$white",
//           border: "none",
//         },
//       },
//     },
//   },
// });

// export default Button;
