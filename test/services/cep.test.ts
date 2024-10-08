import {GetCepService, Address} from '../../src/api/services/GetCepService';

global.fetch = jest.fn();

const getCepService = new GetCepService();

describe('testa serviço de buscar cep', () => {
    it('deve retornar cep válido e esperado', async () => {
        const mockAddress: Address = {
            cep: '75650-000',
            logradouro: '',
            complemento: '',
            unidade: '',
            bairro: '',
            localidade: 'Morrinhos',
            uf: 'GO',
            estado: 'Goiás',
            regiao: 'Centro-Oeste',
            ibge: '5213806',
            gia: '',
            ddd: '64',
            siafi: '9473'
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockAddress,
        });

        const data = await getCepService.execute('75650000');
        expect(data).toEqual(mockAddress);
        expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/75650000/json/');


    });
});