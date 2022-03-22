import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/aldeias/";

export const getAll = async() => {
    return (await axios.get(API_URL,
        {headers: authHeader()}
    )).data;
}
export const getById = async(id) => {
    return (await axios.get(API_URL + id,
        {headers: authHeader()}
    )).data;
}

export const update = async(id, nome, telefone, endereco) => {
    var dados = {nome:nome, telefone:telefone, endereco: endereco};
    await axios.put(API_URL + id, dados,{
        headers: authHeader()
    });
}

export const create = async(nome, telefone, endereco, user) => {
    var dados = {nome:nome, telefone:telefone, endereco: endereco, user:user};
    await axios.post(API_URL, dados,{
        headers: authHeader()
    });
}

export const deleteItem = async(id) => {
    await axios.delete(API_URL + id,{
        headers: authHeader()
        }
    );
}

