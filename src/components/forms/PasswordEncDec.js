export const encodePassword = (password) => {
    try {
        const encodedPassword = btoa(password);

        return encodedPassword;
    } catch (error) {
        console.error('Error encoding password:', error);
        throw error;
    }
};

export const decodePassword = (encodedPassword) => {
    try {
        const decodedPassword = atob(encodedPassword);

        return decodedPassword;
    } catch (error) {
        console.error('Error decoding password:', error);
        throw error;
    }
};
