import axios from 'axios';

const calendarAPI = axios.create({
  baseURL: 'http://localhost:3001/api/calendarData',
});

calendarAPI.get = async () =>
  calendarAPI.request({
    method: 'get',
  });

calendarAPI.post = async (body) =>
  calendarAPI.request({
    method: 'post',
    data: body,
  });

calendarAPI.put = async (body, id) =>
  calendarAPI.request({
    method: 'put',
    data: body,
    params: {
      id,
    },
  });

calendarAPI.delete = async (id) =>
  calendarAPI.request({
    method: 'delete',
    params: {
      id,
    },
  });

export default calendarAPI;
