const Content = (props) => {
    console.log('Checking for props in content',props)
    return (
        <div>
            <Part part={props.part1.name} exercises={props.part1.exercises1} />
            <Part part={props.part2.name} exercises={props.part2.exercises2} />
            <Part part={props.part3.name} exercises={props.part3.exercises3} />
        </div>
    )
}

export default Content;

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
}