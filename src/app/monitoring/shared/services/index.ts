import { BindingService } from './binding.service';
import { EndpointService } from 'app/monitoring/shared/services/endpoint.service';
import { ErrorserviceService } from './errorservice.service';

export * from './binding.service';
export * from './endpoint.service';

export const services = [BindingService, EndpointService, ErrorserviceService];
