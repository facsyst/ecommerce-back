import { Module } from '@nestjs/common';
import { LoginHistoryService } from './login_history.service';
import { LoginHistoryController } from './login_history.controller';

@Module({
  controllers: [LoginHistoryController],
  providers: [LoginHistoryService],
})
export class LoginHistoryModule {}
