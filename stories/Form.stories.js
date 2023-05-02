import { Input_storybook } from '../components/elements/Form';

export default {
  title: 'Input',
  component: Input_storybook,
  argTypes: {
    color: { control: { type: 'color', presetColors: ['red', 'green'] } },
  },
};

const Template = args => <Input_storybook {...args} />;

export const Default = Template.bind({});
Default.args = {
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid',
  label: 'Simple field',
  placeholder: 'Placeholder',
};

export const Disabled = Template.bind({});
Disabled.args = {
  backgroundColor: 'lightgrey',
  color: 'lightgrey',
  border: '1px solid',
  label: 'Simple field',
  placeholder: 'Placeholder',
};

export const Error = Template.bind({});
Error.args = {
  backgroundColor: 'pink',
  color: 'red',
  border: '1px solid',
  label: 'Simple field',
  placeholder: 'Placeholder',
};


