const models = require('./models');
exports.authorizationManager = function () {
    let _clientCredentials = [];
    const makeHash = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 24; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    return {
        addCredential: (name, passKey) => {
            if (!_clientCredentials.find(f => f.name === name)) {
                _clientCredentials.push(new models.clients.clientCredential(name, passKey))

                return true;
            }
            return false;
        },
        updateCredential(name, passKey) {
            _clientCredentials.forEach((i) => {
                if (i.name === name) {
                    i.passKey = passKey;
                    return true;
                }
            })
            return false;
        },
        removeCredental(name) {
            let index = _clientCredentials.findIndex(f => f.name === name);
            if (index > -1) {
                _clientCredentials = _clientCredentials.splice(index, 1);
                return true;
            }
            return false;
        },
        validateCredential(cred) {

            if (models.validModal(new models.security.credential(), cred)) {
                const cc = _clientCredentials.find(f => f.client.name === cred.name);
                if (cc) {


                    if (cc && cc.clientPassKey && cred.passkey && cc.clientPassKey === cred.passkey) {
                        const nw = new Date();
                        cc.authorization = new models.security.authorization(true, makeHash(), new Date((new Date()).getTime() + 30 * 60000));

                    } else {
                        cc.authorization = new models.security.authorization(false, '');
                    }
                    return cc.authorization;
                }
            }
            return new models.security.authorization(false, '');
        },
        validateAuthorization(auth) {
            if (models.validModal(new models.security.authorization(), auth)) {
console.log(_clientCredentials);
                 
                   
                    if (_clientCredentials.find(f => f.authorization.token === auth.token)) {
                        return true;
                    }
                
            }
            return false;

        }

    }

}();