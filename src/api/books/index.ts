import Api from "@/common/api";

export interface Author {
  _id: string;
  nome: string;
  nacionalidade: string;
}
export interface Books {
  _id: string;
  titulo: string;
  autor: Author;
  editora: string;
  numeroPaginas: number;
}

class BooksApi extends Api {
  async getBooks(): Promise<Books[]> {
    return (await this.axios.get<Books[]>(`/livros`)).data;
  }

  async getBook(params: string): Promise<Books[]> {
    return (await this.axios.get<Books[]>(`/livros/${params}`)).data;
  }

  async putBook(params: string, titulo?: string, editora?: string, numeroPaginas?: number): Promise<Books[]> {
    return (await this.axios.put<Books[]>(`/livros/${params}`, {titulo: titulo , editora: editora, numeroPaginas: numeroPaginas})).data;
  }

  async postBook(titulo?: string, editora?: string, autor?: string, numeroPaginas?: number): Promise<Books[]> {
    return (await this.axios.post<Books[]>(`/livros`, {titulo: titulo , editora: editora, autor: autor, numeroPaginas: numeroPaginas})).data;
  }
}

export default BooksApi;
