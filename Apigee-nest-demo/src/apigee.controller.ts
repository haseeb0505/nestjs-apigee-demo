
import { Controller, Post, Body } from '@nestjs/common';
import { ApigeeService } from './apigee.service';

@Controller('apigee')
export class ApigeeController {
   constructor(private readonly apigeeService: ApigeeService) {}

   @Post('create-user-proxies')
   async createUserProxies(@Body() body: { environment: string }) {
       const { environment } = body;

       const endpoints = [
           { name: 'get-users', url: 'http://localhost:3000/users', methods: ['GET'] },
           { name: 'create-user', url: 'http://localhost:3000/users', methods: ['POST'] },
           { name: 'get-user', url: 'http://localhost:3000/users/:id', methods: ['GET'] },
           { name: 'update-user', url: 'http://localhost:3000/users/:id', methods: ['PUT'] },
           { name: 'delete-user', url: 'http://localhost:3000/users/:id', methods: ['DELETE'] },
       ];

       for (const endpoint of endpoints) {
           const policies = [
               { name: 'QuotaPolicy', type: 'Quota', config: '<Quota name="QuotaPolicy"><Interval>1</Interval><TimeUnit>minute</TimeUnit><Allow count="100"/></Quota>' },
               { name: 'RateLimitPolicy', type: 'RateLimit', config: '<RateLimit name="RateLimitPolicy"><Interval>1</Interval><TimeUnit>minute</TimeUnit><Allow count="50"/></RateLimit>' },
               { name: 'SpikeArrestPolicy', type: 'SpikeArrest', config: '<SpikeArrest name="SpikeArrestPolicy"><Rate>10ps</Rate></SpikeArrest>' },
           ];

           // Create Proxy and Apply Policies
           await this.apigeeService.createProxy(endpoint.name, endpoint.url, policies);

           // Deploy Proxy
           await this.apigeeService.deployProxy(endpoint.name, environment);
       }

       return { message: 'Proxies created and deployed successfully' };
   }
}
