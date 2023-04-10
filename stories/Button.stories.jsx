import { Button, PrimaryButton, SecondaryButton, SuccessButton, LargeButton } from '../components/elements/Button';

export default {
  title: "Button",
  component: Button,
};

export const Primary = () => <PrimaryButton>Botão!</PrimaryButton>;

export const Secondary = () => <SecondaryButton>Click me!</SecondaryButton>;

export const Success = () => <SuccessButton>Click me!</SuccessButton>;


// import React from 'react';
// import { Button } from '../components/elements/Button';


// export default {
//   title: 'Button',
//   component: Button,
// };

// export const Default = () => <Button>Click me!</Button>;

// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// export default {
//   title: 'Example/Button',
//   component: Button,
//   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// };

// // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template = args => <Button {...args} />;

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };


// import { storiesOf } from '@storybook/react';
// import { Button } from '../components/Button';

// storiesOf('Button', module).add('Default', () => <Button />);