import Api from "@/common/api";

export interface Autor {
  _id: string;
  nome: string;
  nacionalidade: string;
}
export interface Livros {
  _id: string;
  titulo: string;
  autor: Autor;
  editora: string;
  numeroPaginas: number;
}

class LivrosApi extends Api {
  async getBooks(): Promise<Livros[]> {
    return (await this.axios.get<Livros[]>(`/livros`)).data;
  }

  async getBook(params: string): Promise<Livros[]> {
    return (await this.axios.get<Livros[]>(`/livros/${params}`)).data;
  }

  async putBook(params: string, titulo?: string, editora?: string, numeroPaginas?: number): Promise<Livros[]> {
    return (await this.axios.put<Livros[]>(`/livros/${params}`, {titulo: titulo , editora: editora, numeroPaginas: numeroPaginas})).data;
  }

  async postBook(): Promise<Livros[]> {
    return (await this.axios.post<Livros[]>(`/livros`)).data;
  }
}

export default LivrosApi;
