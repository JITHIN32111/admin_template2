import axiosConfig from '../config/axiosConfig';

const authAPI = () => {
  const doLogin = async (data) => {
    console.log("Login data:", data);
    const res = await axiosConfig.post("/users/login", data);
    console.log(res);
    
    return res;
  };
  const addMember = async (data) => {
  
    const res = await axiosConfig.post("/users/", data);
    
    return res;
  };
  const getTotalAmounts = async () => {
  
    const res = await axiosConfig.get("/admin/get-total-amount", );
    
    return res;
  };

  return { doLogin ,addMember,getTotalAmounts};
};

export default authAPI;
