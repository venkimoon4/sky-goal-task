const initialState={
  user:{}
}

const userReducer=(state=initialState,action)=>{

  if(action.type==="fetchData"){
    return {...state,user:action.data}
  }
  else if(action.type==="update"){
    return {user:action.data}
  }

  return state;

}

export default userReducer;