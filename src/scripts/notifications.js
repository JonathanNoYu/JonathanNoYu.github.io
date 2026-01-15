import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setClose, clearNotifs } from '../Store/notifSlice';

function MultiToast() {
    const notifs = useSelector(state => state.notifs)
    const dispatch = useDispatch()
    return(
        <ToastContainer position={'bottom-end'} style={{ zIndex: 11, padding:"20px" }}>
                <Toast onClose={() => {dispatch(setClose())
                    dispatch(clearNotifs())
                }} 
                    show={notifs.open} delay={3500} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Backend Info!</strong>
                    </Toast.Header>
                    {notifs.notifTexts.map((text) => {
                        var comps;
                        const textSplit = text.split("\n")
                        if (textSplit.length > 1) {
                            comps = textSplit.map((line) => <p className='wd-new-line'>{line}</p>)
                        } else {
                            comps = <p className='wd-new-line'>{text}</p> 
                        }
                        return(<Toast.Body>{comps}</Toast.Body>)
                    })}
                </Toast>
        </ToastContainer>
    )
} 
export default MultiToast
