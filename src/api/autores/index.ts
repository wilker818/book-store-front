import Api from "@/common/api";

export interface Autor {
  _id: string;
  nome: string;
  nacionalidade: string;
}

class AutoresApi extends Api {
  async get(): Promise<Autor[]> {
    return (await this.axios.get<Autor[]>("/autores")).data;
  }
  async getAuthor(params: string): Promise<Autor[]> {
    return (await this.axios.get<Autor[]>(`/autores/${params}`)).data;
  }

  async putAuthor(params: string, nome?: string, nacionalidade?: string): Promise<Autor[]> {
    return (await this.axios.put<Autor[]>(`/autores/${params}`, {nome: nome , nacionalidade: nacionalidade})).data;
  }

  async postAuthor(nome?: string, nacionalidade?: string): Promise<Autor[]> {
    return (await this.axios.post<Autor[]>(`/autores`, {nome: nome , nacionalidade: nacionalidade})).data;
  }
}

export default AutoresApi;
