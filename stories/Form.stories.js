import { Input_storybook } from '../components/elements/Form';

export default {
  title: 'Input',
  component: Input_storybook,
  argTypes: {
    color: { control: { type: 'color', presetColors: ['red', 'green'] } },
    required: { control: 'boolean' }
  },
};

const Template = args => <Input_storybook {...args} />;

export const Default = Template.bind({});
Default.args = {
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid',
  label: 'Simple field',
  placeholder: 'Batata',
  required: '*'
};
