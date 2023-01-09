import Api from "@/common/api";

export interface Author {
  _id: string;
  nome: string;
  nacionalidade: string;
}

class AuthorsApi extends Api {
  async get(): Promise<Author[]> {
    return (await this.axios.get<Author[]>("/autores")).data;
  }
  async getAuthor(params: string): Promise<Author[]> {
    return (await this.axios.get<Author[]>(`/autores/${params}`)).data;
  }

  async putAuthor(params: string, nome?: string, nacionalidade?: string): Promise<Author[]> {
    return (await this.axios.put<Author[]>(`/autores/${params}`, {nome: nome , nacionalidade: nacionalidade})).data;
  }

  async postAuthor(nome?: string, nacionalidade?: string): Promise<Author[]> {
    return (await this.axios.post<Author[]>(`/autores`, {nome: nome , nacionalidade: nacionalidade})).data;
  }
}

export default AuthorsApi;
