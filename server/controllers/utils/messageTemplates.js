const _ = require('lodash')

class EmailMsg {
    constructor(email, name, token = ''){
        this.name = name
        this.email = email
        this.token = token
    }

    userAccountVerification () {
        return {
            email: this.email,
            title: "Boayant - New Account Verification",
            message: `
                Hi ${_.camelCase(this.name)},
                Your one time verification code is ${this.token},
            
                `
        }
    }
    
    superAdminAccVerification() {
        return {
            email: this.email,
            title: "Boayant - New Super Admin Account verification",
            message: `
                Hi ${_.camelCase(this.name)},

                A new signup for a Super admin to the web app has been requested,
                
                Your one time verification code is ${this.token},
            
                `
        }
    }
    superAdminPasswordResetVerification(){
        return {
            email: this.email,
            title: "Boayant - New Super Admin Account verification",
            message: `
            Hi  ${_.camelCase(this.name)},

            A password reset request was initiated for a super admin account

            Your temporary password reset token is ${this.token},
                `
        }
    }
    passwordReset () {
        return {
            email: this.email,
            title: "Boayant - Account password reset confirmation",
            message: `
                Hi ${_.camelCase(this.name)},
                You requested for a password reset.
                Your one time reset code is ${this.token},
            
                `
        }
    }
}


module.exports = {
    EmailMsg
}