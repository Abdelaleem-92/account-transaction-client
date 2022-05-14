import React, { useState } from 'react'
import { addAccount, saveTokenToLocalStorage} from './UtilsService';

const AddAccountComponent = ({ show, handleClose, selectUser, reloadUsers, setSelectedUser }) => {

  const showHideClassName = show ? "modal d-block" : "modal d-none";
  const [initalCredit, setInitalCredit] = useState("");

  const handleCloseAddAccountComponent = () => {
    handleClose();
    setInitalCredit("");
  }

  const addAccountThenReloadUsers = () => {
    addAccount({"customerId": selectUser.id,"initalCredit": initalCredit}).
    //editCity({"name": cityName, "photoUrl": photoUrl }).
       then((status) => {
           if (status) {
               setTimeout(function () {
                  reloadUsers();
                  setSelectedUser("");
                  handleClose();
                   alert("new account added successfully")
               }, 500)
           }
       }
       )

}

  const handleAddAccount = async () => {
    if (!localStorage.getItem('token')) {
        saveTokenToLocalStorage().then(
            () => {
                addAccountThenReloadUsers();
            }
        );
    } else {
      addAccountThenReloadUsers();
    }

}

  return (
    <div className={showHideClassName}>
      <div className="addAccountContainer">

        <div className="form-group">
          <label>customer id:</label>
          <input
            type="text"
            value={selectUser.id}
            name="modalInputName"
            className="form-control"
            disabled
          />

          <label>intial credit:</label>
          <input
            type="text"
            value={initalCredit}
            name="modalInputName"
            onChange={e => { setInitalCredit(e.target.value) }}
            className="form-control"
          />

        </div>
        <div className="form-group">
          <button className="formButton" onClick={handleAddAccount} type="button">
            add account
            </button>
        </div>


        <a href="javascript:;" className="modal-close" onClick={handleCloseAddAccountComponent}
        >
          close
            </a>
      </div>
    </div>
  );
}

export default AddAccountComponent
