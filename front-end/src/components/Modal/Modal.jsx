import React, { useContext } from 'react'
import { RiCloseLine } from 'react-icons/ri';

import { LoginContext } from '../../contexts/loginContext';


import './Modal.css';
import { useNavigate } from 'react-router-dom';

const Modal = () => {
    const navigate = useNavigate();

    const { setUserLogin, setModalOpen } = useContext(LoginContext);

    return (
        <div className="darkBg" onClick={() => setModalOpen(false)}>
            <div className="centered">
                <div className='modal'>
                    <div className="modalHeader">
                        <h5 className='heading'>Confirm</h5>
                    </div>

                    <button className='closeBtn' onClick={() => setModalOpen(false)}>
                        <RiCloseLine />
                    </button>

                    <div className="modalContent">
                        Are you really want to log Out ?
                    </div>

                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className='logOutBtn' onClick={()=>{
                                setModalOpen(false);
                                setUserLogin(false);
                                localStorage.clear();
                                navigate('/signin');
                            }}>Log Out</button>
                            <button className='cancelBtn' onClick={() => setModalOpen(false)}>cancel</button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal