import Api from "@/common/api";

export interface Livros {
  _id: string;
  titulo: string;
  autor: string;
  editora: string;
  numeroPaginas: number;
}

class LivrosApi extends Api {
  async getBooks(): Promise<Livros[]> {
    return (await this.axios.get<Livros[]>("/livros")).data;
  }

  async getBook(params: string): Promise<Livros[]> {
    return (await this.axios.get<Livros[]>(`/livros/${params}`)).data;
  }
}

export default LivrosApi;
