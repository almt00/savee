import { Butao } from "../components/elements/Button"

export default {
    title: "Button",
    component: Butao,
    argTypes: {handleClick: {action: "handleClick"}}
}

const Template = args => <Butao {...args}/>


export const Red = Template.bind({})
Red.args= {
    backgroundColor: "red",
    label: "Press Me",
    size: "md"
}

export const Green = Template.bind({})
Green.args= {
    backgroundColor: "green",
    label: "I'am Success",
    size: "lg"
}

export const Small = Template.bind({})
Small.args= {
    backgroundColor: "blue",
    label: "I'am Small",
    size: "sm"
}

export const Long_label = Template.bind({})
Long_label.args= {
    backgroundColor: "red",
    label: "this is a bottun for a long label text",
    size: "md"
}
