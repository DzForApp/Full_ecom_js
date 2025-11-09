import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    check() {
        return {
            status: 'ok',
            message: 'NestJS server is running successfully',
            timestamp: new Date().toISOString(),
        }
    }
}
