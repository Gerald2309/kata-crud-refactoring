import React, { useContext, useRef, useState} from "react";
import Store from "../store/store";

const HOST_API = "http://localhost:8080/api";

const Form = () => {
    const formRef = useRef(null);
    const { dispatch, state: { todo }, } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
  
    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
        completed: false
      };
  
  
      fetch(HOST_API + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    const onEdit = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
  
  
      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    return (
        <form ref={formRef}>
            <input
              className="input"
                type="text"
                placeholder="¿Qué piensas hacer hoy?"
                defaultValue={item.name}
                onChange={(event) => {
                    setState({ ...state, name: event.target.value });
                }}
                ></input>
                {item.id && <button onClick={onEdit} className="input">Actualizar</button>}
                {!item.id && <button onClick={onAdd} className="input">Crear</button>}
        </form>
    );
  };

  export default Form;