export const encodePassword = (password) => {
    try {
        return btoa(password);
    } catch (error) {
        console.error('Error encoding password:', error);
        throw error;
    }
};

export const decodePassword = (encodedPassword) => {
    try {
        return atob(encodedPassword);
    } catch (error) {
        console.error('Error decoding password:', error);
        throw error;
    }
};
