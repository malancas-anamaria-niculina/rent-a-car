export const axiosHeaderConfig = (token) => {
	return { headers: { Authorization: `${token}` } };
};