import {firebaseDatabase} from '../utils/firebase'

export const getUsersonRoom = (docId, callback) => {
    try {
        var ref = firebaseDatabase.ref('rooms').child(docId)
        ref.on("value", callback)
    } catch (error) {
        return false
    }
    return true
}