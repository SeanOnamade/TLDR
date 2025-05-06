import {db} from "@/lib/firebase"
import {collection, query, where, getDocs} from "firebase/firestore"

const LENGTH_ID = 14

/**
 * @breif: this function generates a random Developer ID for users to access MCP function
 *          Once a id is generated it is checked against other ID using firestore built in functions
 *          to esnsure that it is unique, then returned. Is a utility function
 * 
 * @param: none
 * @returns: the users unique ID
 * 
 */
const generateID = () => {

    const chars = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefighjklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < LENGTH_ID; i++)
    {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }


    return result;
};

/**
 * 
 * @breif: This function checks the uniqueness of the devID
 * 
 * @param: none
 * @returns: devID -> users unique id
 */
const uniqueID = async () => 
{
    let ID;
    let bool_unique = false;

    while (!bool_unique)
    {
        ID = generateID();
        const query_collec = query(collection(db, "users"), where("address", "==", ID));
        const snapshot = await getDocs(query_collec);

        if(snapshot.empty)
        {
            bool_unique = true;
        }
    }

    return ID;
};

export {uniqueID}