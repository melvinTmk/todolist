
export default function Item(props) {
  return (
    <li className="border border-2 rounded p-2 m-2">
        <div className="p-3 text-white">{props.txt}</div>
        <div className="justify-content-center align-items-center d-flex">
            <button 
            className="btn btn-danger w-25 p-2 h-50" 
            onClick={() => props.delFunc(props.id)}>Supprimer</button>
            <button 
            className="btn btn-success p-2 mx-4 w-25 h-50 text-white" onClick={()=> props.stateOfTask(props.id)} id="complete">Fait</button>
            <button 
            className="btn btn-warning p-2  w-25 h-50 text-white" onClick={()=> props.todoTask(props.id)} id="todo">Remettre dans liste</button>
        </div>
    </li>
  )
}
