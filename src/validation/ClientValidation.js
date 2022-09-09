import validator from 'validator';

const ClientValidation = (data) => {
    let errors = {};
    const {
        client_FirstName,
        client_LastName,
        client_profilePicture,
        client_UserName,
        client_Email,
        client_Mobile,
        client_NIC,
        client_Password,
        client_Gender,
        client_DOB,
        client_Status,
        client_Address,
    } = data;

    console.log(data)

    if (validator.isEmpty(client_FirstName)) {
        errors.client_FirstName = 'Input your first name';
    } else if (client_FirstName === undefined) {
        errors.client_FirstName = 'Input your first name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(client_FirstName) === false) {
            errors.client_FirstName = 'Input your first name in alphabets';
        }
    }

    if (validator.isEmpty(client_LastName)) {
        errors.client_LastName = 'Input your last name';
    } else if (client_LastName === undefined) {
        errors.client_LastName = 'Input your last name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(client_LastName) === false) {
            errors.client_LastName = 'Input your last name in alphabets';
        }
    }

    if (validator.isEmpty(client_Email)) {
        errors.client_Email = 'Input your email';
    } else if (client_Email === undefined) {
        errors.client_Email = 'Input your email';
    } else {
        let chekEmail = false;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(client_Email)) {
            chekEmail = true;
        } else {
            errors.client_Email = 'Input valid email';
        }
    }

    if (validator.isEmpty(client_Mobile)) {
        errors.client_Mobile = 'Input your contact';
    } else if (client_Mobile === undefined) {
        errors.client_Mobile = 'Input your contact';
    } else {
        if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(client_Mobile)) {
            errors.client_Mobile =
                'Input contact number with country code eg. +94';
        } else {
        }
    }

    if (validator.isEmpty(client_Address)) {
        errors.client_Address = 'Input your address';
    } else if (client_Address === undefined) {
        errors.client_Address = 'Input your address';
    }


    if (validator.isEmpty(client_DOB)) {
        errors.client_DOB = 'Input your Date of birth';
    } else if (client_DOB === undefined) {
        errors.client_DOB = 'Input your Date of birth';
    }

    if (validator.isEmpty(client_Gender)) {
        errors.client_Gender = 'Please select the gender time';
    } else if (client_Gender === undefined) {
        errors.client_Gender = 'Please select the gender time';
    }

    if (validator.isEmpty(client_Status)) {
        errors.client_Status = 'Please select the Status';
    } else if (client_Status === undefined) {
        errors.client_Status = 'Please select the Status';
    }

    if (validator.isEmpty(client_UserName)) {
        errors.client_UserName = 'Please input the user name';
    } else if (client_UserName === undefined) {
        errors.client_UserName = 'Please input the user name';
    }
    if (validator.isEmpty(client_NIC)) {
        errors.client_NIC = 'Please input the NIC';
    } else if (client_NIC === undefined) {
        errors.client_NIC = 'Please input the NICe';
    }

    if (validator.isEmpty(client_Password)) {
        errors.client_Password = 'Input your Password';
    } else if (client_Password === undefined) {
        errors.client_Password = 'Input your Password';
    } else {
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(client_Password)) {
            errors.client_Password =
                'Minimum eight characters, at least one letter, one number and one special character';
        } else {
        }
    }


    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };
};

export default ClientValidation;