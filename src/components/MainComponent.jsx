import React, { useState, useEffect } from 'react'
import UsersComponent from './UsersComponent';
import { getAllUsers, saveTokenToLocalStorage} from './UtilsService';


const MainComponent = () => {

    const [userList, setUserList] = useState([]);
    const [fetchStatus, setFetchStatus] = useState("");

    useEffect(() => {
        localStorage.removeItem("token");
        loadUsersData();
    }, []);

    const loadUsersData = () => {
        if (!localStorage.getItem('token')) {
            saveTokenToLocalStorage().then(
                () => {
                    getAllUsersData();
                }
            );
        } else {
            getAllUsersData();
        }


        
    }

    const getAllUsersData = () => {
        getAllUsers().then(function(response) {
            setUserList(response);
            if(response && response.length > 0){
                setFetchStatus('success');
                showUsersData();
            }
                
            else
                setFetchStatus('No Data');
        })

   }

    const showUsersData = () => {
        if (fetchStatus.length == 0) {
            return (
                <div className="dataFetchLoading"><span >Loading Cutomers Data...</span>  </div>
            )
        } else
            if (fetchStatus == 'success') {
                return (
                    <UsersComponent
                        users={userList} title="Cutomers List" reloadUsers = {loadUsersData}
                    />
                )

            } else {
                return (
                    <div className="dataFetchFailure"><span >Failed to load Cutomers 😟</span>  </div>
                )
            }

    }

    return (
        <div className="mainContainer">

            {
                showUsersData()
            }

            

        </div>
    )

}

export default MainComponent;