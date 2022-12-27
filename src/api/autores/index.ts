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
}

export default AutoresApi;
