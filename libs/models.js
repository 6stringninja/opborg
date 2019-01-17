exports.security = {
    credential: class {
        constructor(passkey = '',name='') {
            this.passkey = passkey;
            this.date = new Date();
            this.name = name;
        }
    },
    authorization: class {
        constructor(success = false, token = '', expires = new Date()) {
            this.success = success;
            this.token = token;
            this.expires = expires;
        }
    }
}
exports.clients = {
    client: class {
        constructor(name = '') {
            this.name = name;
        }
    },
    clientCredential: class {
        constructor(name, clientPassKey) {
            this.client = new exports.clients.client(name);
            this.credential = new exports.security.credential('',name);
            this.clientPassKey = clientPassKey;
            this.authorization = new exports.security.authorization();
        }
         name(){
            return  this.client.name;
        }
    }
}
exports.validModal = (modal, src) => {
    const srckeys = Object.keys(src);
    let rturn = true;
    Object.keys(modal).forEach((f) => {
        let sr = srckeys.some(s => s === f);
        if (sr === false) {
            rturn = false;
        }
    })
    return rturn;
}
exports.copy = (modal, src) => {
    Object.keys(modal).filter(f =>
        Object.keys(src).some((s) => s === f)).forEach((r) => modal[r] = src[r])
    return modal;
}
exports.copyValidModel = (modal, src, res) => {
    if (this.validModal(modal, src)) {
        res = this.copy(modal, src);
        return true;
    } else {
        res = modal;
        return false;
    }
}