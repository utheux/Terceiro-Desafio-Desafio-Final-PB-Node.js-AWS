
export interface Address {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;

}
export class GetCepService {
    public async execute(cep: string): Promise<Address | null>{
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
   
        const data: Address = await response.json() as Address;
        return data;
    }

}





