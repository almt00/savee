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

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: 'white',
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


