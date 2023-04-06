import Button from "../components/elements/Button";

export default {
    title: "Components/Elements/Button",
    component: Button,
    argtypes: {handleClick: {action: "Primeira Tentativa"}}
}

const Template = args => <Button {...args}/>

export const Button_test = Template.bind({})
Button_test.args = {
    backgroundColor: "blue",
    label: "Press me I am blue",
    size: "md"
}