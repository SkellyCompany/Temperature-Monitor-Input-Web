import { ITemperatureRecordModel } from './../../../domain/models/temperature-record/ITemperatureRecordModel';
import { GetServerSidePropsContext } from 'next';
import { AuthorizationType, HttpService, ResponseType } from './core/Http.service';
import { IResponse } from './core/IResponse';

export class TemperatureService {
	private readonly humidityUrl: string = "/temperature";

	private readonly service: HttpService;

	constructor(ctx: GetServerSidePropsContext = null) {
		this.service = new HttpService(ctx);
	}

	public async sendRecord(temperatureRecord: ITemperatureRecordModel): Promise<IResponse<void>> {
		return this.service.post(this.humidityUrl, temperatureRecord, AuthorizationType.NONE, ResponseType.VOID) as Promise<IResponse<void>>
	}
}
