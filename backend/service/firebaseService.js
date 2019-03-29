const firebaseDatabase = require('../utils/firebase').firebaseDatabase

const setUserOnRoom = (user, docId, clientId) => {
    try {
        var ref = firebaseDatabase.ref('rooms').child(docId).child(clientId)
        ref.set(user)
    } catch (error) {
        return false
    }
    return true
}

exports.setUserOnRoom = setUserOnRoom