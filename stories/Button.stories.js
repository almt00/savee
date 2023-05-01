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
  label: "I'am Success",
  border: "1px solid",
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  backgroundColor: 'blue',
  label: "I'am Small",
  size: 'sm',
};

export const Long_label = Template.bind({});
Long_label.args = {
  backgroundColor: 'red',
  label: 'this is a bottun for a long label text',
  size: 'md',
};
