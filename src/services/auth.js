const setUserId = userId => localStorage.setItem('userId', userId);

const getUserId = () => localStorage.getItem('userId');

export { setUserId, getUserId };