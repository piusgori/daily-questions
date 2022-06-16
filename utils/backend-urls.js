const apiKey = 'AIzaSyD_mx37hqe-5mZ3VbT8i-oFSzXU2fSZtNk';

export const urls = {
    signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    database: 'https://knowledge-gain-d7031-default-rtdb.firebaseio.com'
}