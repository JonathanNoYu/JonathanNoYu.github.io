import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function multiSnackBar(textArr, open, handleClose) {
    if (typeof(textArr) == Array) {
        return(
            <>
                {textArr.map((text) => {
                    return(<Snackbar
                        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                        open={open}
                        onClose={handleClose}
                        slot = {{ transition: (props) => <Slide {...props} direction="up"/>}}
                        autoHideDuration={4000}
                        message={text}
                    />)
                })}
            </>
        )
    }
} export default multiSnackBar