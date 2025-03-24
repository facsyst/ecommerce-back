import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginHistoryDto } from './create-login_history.dto';

export class UpdateLoginHistoryDto extends PartialType(CreateLoginHistoryDto) {}
