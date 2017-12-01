
/*
    makeCartridgeName() is function which returns endeca 'contentType' in the form of our folder structure,
    We are using this to maintain out Naming conventions accros the Project. 
*/
export const makeCartridgeName = (contentType) => (contentType.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ").join("-").toLowerCase())