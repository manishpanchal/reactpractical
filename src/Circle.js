import './App.css';
function Circle(props) {
    console.log({props});
    return ( 
        <div className="col-25">
            <div className={props.cname}> {props.counter} </div>
        </div>
    );
}
export default Circle;