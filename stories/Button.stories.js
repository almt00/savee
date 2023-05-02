import { Button_storybook } from '../components/elements/Button';

export default {
  title: 'Button',
  component: Button_storybook,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    handleClick: { action: 'handleClick' },
  },
};

const Template = args => <Button_storybook {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: 'white',
  color: "black",
  label: "Primary",
  border: "1px solid",
  size: 'md',
};

export const Secondary = Template.bind({});
Secondary.args = {
  backgroundColor: 'none',
  color: "royalblue",
  label: "Secondary",
  border: "none",
  size: 'md',
};

export const Long_label = Template.bind({});
Long_label.args = {
  backgroundColor: 'red',
  label: 'this is a bottun for a long label text',
  size: 'md',
};
