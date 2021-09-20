import { GetServerSidePropsContext } from 'next';
import { IHumidityRecordModel } from '../../../domain/models/humidity-record/IHumidityRecordModel';
import { AuthorizationType, HttpService, ResponseType } from './core/Http.service';
import { IResponse } from './core/IResponse';

export class HumidityService {
	private readonly humidityUrl: string = "/humidity";

	private readonly service: HttpService;

	constructor(ctx: GetServerSidePropsContext = null) {
		this.service = new HttpService(ctx);
	}

	public async sendRecord(humidityRecord: IHumidityRecordModel): Promise<IResponse<void>> {
		return this.service.post(this.humidityUrl, humidityRecord, AuthorizationType.NONE, ResponseType.VOID) as Promise<IResponse<void>>
	}
}
