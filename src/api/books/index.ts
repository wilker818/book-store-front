import Api from "@/common/api";

export interface Author {
  _id: string;
  nome: string;
  nacionalidade: string;
}
export interface Book {
  _id: string;
  titulo: string;
  autor: Author;
  editora: string;
  numeroPaginas: number;
}

class BooksApi extends Api {
  async getBooks(): Promise<Book[]> {
    return (await this.axios.get<Book[]>(`/livros`)).data;
  }

  async getBook(id: string): Promise<Book> {
    return (await this.axios.get<Book>(`/livros/${id}`)).data;
  }

  async putBook(id: string, titulo?: string, editora?: string, numeroPaginas?: number): Promise<Book> {
    return (await this.axios.put<Book>(`/livros/${id}`, {titulo: titulo , editora: editora, numeroPaginas: numeroPaginas})).data;
  }

  async postBook(titulo?: string, editora?: string, autor?: string, numeroPaginas?: number): Promise<Book> {
    return (await this.axios.post<Book>(`/livros`, {titulo: titulo , editora: editora, autor: autor, numeroPaginas: numeroPaginas})).data;
  }
}

export default BooksApi;
