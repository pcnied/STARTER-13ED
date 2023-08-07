import { Base, Usuario } from '.';

type TipoTransacao = 'entrada' | 'saida';

type AtualizarTransacaoDTO = {
	valor?: number;
	tipo?: TipoTransacao;
	dataLancamento?: Date;
};

export class Transacao extends Base {
	private _dataLancamento: Date;

	constructor(
		private _valor: number,
		private _tipo: TipoTransacao,
		private _autor: Usuario
	) {
		super();
		this._dataLancamento = new Date();
	}

	public toJSON() {
		return {
			id: this._id,
			valor: this._valor,
			tipo: this._tipo,
			criadoEm: this._dataLancamento,
			autor: this._autor.toJSON(),
		};
	}

	public atualizarDetalhes(novasInfos: AtualizarTransacaoDTO): boolean {
		if (novasInfos.valor) {
			if (novasInfos.valor < 0) {
				return false;
			}

			this._valor = novasInfos.valor;
		}

		if (novasInfos.tipo) {
			this._tipo = novasInfos.tipo;
		}

		if (novasInfos.dataLancamento) {
			this._dataLancamento = novasInfos.dataLancamento;
		}

		return true;
	}
}

/*

- id
- valor: number
- tipo: 'entrada' | 'saida'
- dataLancamento: Date

*/
