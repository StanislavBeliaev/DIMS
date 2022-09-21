function checkPassword(pass, confpass) {
    if (pass === confpass) {
        return true;
    }
    if (pass != confpass) {
        return alert('error');
    }
}
export default checkPassword;
