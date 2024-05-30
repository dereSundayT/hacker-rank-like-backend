import { Controller, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { IsAdminGuard } from '../auth/guard/is-admin.guard';

@UseGuards(IsAdminGuard)
@UseGuards(AuthGuard)
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  //Get Users
  //view user details
}
