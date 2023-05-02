import { Button_storybook } from '../components/elements/Button';

export default {
  title: 'Button',
  component: Button_storybook,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    border: {control: 'select', options: ['solid', 'none']},
    handleClick: { action: 'handleClick' },
  },
};

const Template = args => <Button_storybook {...args} />;
/** This Primary button is important because is the first button users will see once they reach de landing page */
export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: '#FFFFFF',
  color: "black",
  label: "Button",
  border: "1px solid",
  size: 'md',
};
export const Secondary = Template.bind({});
Secondary.args = {
  backgroundColor: '#EBEBEB',
  color: "royalblue",
  label: "Button",
  border: "none",
  size: 'md',
};
export const Transparent = Template.bind({});
Transparent.args = {
  backgroundColor: 'none',
  color: "royalblue",
  label: "Button",
  border: "none",
  size: 'md',
};
export const Solid = Template.bind({});
Solid.args = {
  backgroundColor: '#35A361',
  color: "#FFFFFF",
  label: "Button",
  border: "none",
  size: 'md',
};
export const Danger = Template.bind({});
Danger.args = {
  backgroundColor: '#D63535',
  color: "White",
  label: "Button",
  border: "none",
  size: 'md',
};



