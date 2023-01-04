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

  async postBook(titulo?: string, editora?: string, autor?: string, numeroPaginas?: number): Promise<Livros[]> {
    return (await this.axios.post<Livros[]>(`/livros`, {titulo: titulo , editora: editora, autor: autor, numeroPaginas: numeroPaginas})).data;
  }
}

export default LivrosApi;
