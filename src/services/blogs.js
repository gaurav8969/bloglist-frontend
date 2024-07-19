import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const add = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  try{
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  }catch(error){
    console.log(error);
  }
};

const update = async (updatedBlog) => {
  try{
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
    return response.data;
  }catch(error){
    console.log(error);
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  setToken,
  getAll,
  add,
  update,
  remove
};