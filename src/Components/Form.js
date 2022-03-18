import { useState } from "react";
import Item from "./Item";
import {v4 as uuidv4} from 'uuid'

export default function Form()
{
    const [dataArr, setDataArr] = useState([])

    const [stateInput,setStateInput] = useState();

    const [stateTask,setStateTask] = useState([]);

    //FONCTION POUR SUPPRIMER UN ELEMENT DE LA LISTE 
    const deleteElement = id =>{
        // Ici nous par rapport à l'id de l'item
        const filteredState = dataArr.filter(item =>{
           return item.id !== id;
       })
       const filteredStateComplete = stateTask.filter(item =>{
        return item.id !== id;
    })
       setDataArr(filteredState)
       setStateTask(filteredStateComplete)
    }

    // FONCTION POUR LIER NOTRE INPUT AU STATE (setStateInput)
    const linkedInput = e =>{
        setStateInput(e);
    }


    // FONCTION POUR AJOUTER UNE TACHE 
    const addTodo = e =>{
        // Eviter le rechargement de la page lors de la soumission du formulaire
        e.preventDefault();

        if(dataArr.length > 5)
        {
            alert('Complete les autres tâches John Bob');
        }
        else
        {
            //Créer un nouveau tableau avec les données du State de notre liste car un State est immuable 
            const newArr = [...dataArr]
    
            // Création d'un nouvel objet 
            const newTodo = {};
    
            // Ajouter une propriété txt à l'objet 
    
            newTodo.txt = stateInput;
    
            // Ajouter un id
            newTodo.id = uuidv4();
            // On ajoute ce nouvel objet dans notre nouveau tableau (newArr)
            newArr.push(newTodo);
    
            // On change le State avec le nouveau tableau 
            setDataArr(newArr);
    
            //On reset le State de l'input en bonus 
            setStateInput('');
        }
    }

    const taskState = id => {
        const filteredItem = dataArr.filter(item =>{
            return item.id == id;
        })
        
        const finalArr = dataArr.filter(item =>{
            return item.id !== id;
        })
        
        const newCompleteTaskObj = {};
        filteredItem.map((item) => {
            newCompleteTaskObj.txt = item.txt;
            newCompleteTaskObj.id = item.id;
        })

        const completeTask = [...stateTask]
        completeTask.push(newCompleteTaskObj);
        setStateTask(completeTask);
        setDataArr(finalArr);
    }


    const moveElement = id => {
        const filteredItem = stateTask.filter(item =>{
            return item.id == id;
        })
        
        const finalArr = stateTask.filter(item =>{
            return item.id !== id;
        })
        
        const newObj = {};
        filteredItem.map((item) => {
            newObj.txt = item.txt;
            newObj.id = item.id;
        })

        const completeTask = [...dataArr]
        completeTask.push(newObj);
        setStateTask(finalArr);
        setDataArr(completeTask);
    }


   
    return(
        <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
            <form className="mb-3" onSubmit={e => addTodo(e)}>
                <label htmlFor="todo" className="form-label">
                    Chose à faire
                </label>
                <input value={stateInput} onInput={e => linkedInput(e.target.value)} type="text" className="form-control" id="todo" placeholder="Entrez votre tâche" />
                <button className="mt-2 btn btn-dark d-block">Envoyer</button>
            </form>
            <div className="bg-dark rounded p-4">
                <h2 className="text-white">Liste des choses à faire</h2>
                <ul className="list-group">
                    {dataArr.map((item)=>{
                        return(
                            <Item 
                            txt ={item.txt}
                            key={item.id}
                            id={item.id}
                            delFunc = {deleteElement}
                            stateOfTask = {taskState}
                            />
                        )
                    })}
                </ul>
            </div>

                <br />
                <div className="bg-secondary rounded p-4">
                    <h2 className="text-white">Liste des choses faites </h2>
                    <ul className="list-group">
                        {stateTask.map((item)=>{
                                return(
                                    <Item 
                                    txt ={item.txt}
                                    key={item.id}
                                    id={item.id}
                                    delFunc = {deleteElement}
                                    todoTask = {moveElement}
                                    />
                                )
                            })
                        }
                    </ul>
                </div>
        </div>
    )
}