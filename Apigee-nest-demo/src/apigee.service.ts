
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApigeeService {
    private apigeeBaseUrl = 'https://api.enterprise.apigee.com/v1/organizations/{organization}';
    private username = process.env.APIGEE_USERNAME;
    private password = process.env.APIGEE_PASSWORD;

    private async getAuthHeader() {
        const token = Buffer.from(`${this.username}:${this.password}`).toString('base64');
        return { Authorization: `Basic ${token}` };
    }

    async createProxy(apiName: string, targetUrl: string, policies: any[]) {
        const headers = await this.getAuthHeader();
        const proxyConfig = {
            name: apiName,
            targetEndpoints: [{ name: "default", url: targetUrl }],
            basePath: `/${apiName}`,
        };

        // Create Proxy
        await axios.post(`${this.apigeeBaseUrl}/apis`, proxyConfig, { headers });

        // Add Policies
        for (const policy of policies) {
            await this.addPolicyToProxy(apiName, policy);
        }
    }

    async addPolicyToProxy(apiName: string, policy: any) {
        const headers = await this.getAuthHeader();
        const url = `${this.apigeeBaseUrl}/apis/${apiName}/policies`;
        await axios.post(url, policy, { headers });
    }

    async deployProxy(apiName: string, environment: string) {
        const headers = await this.getAuthHeader();
        const url = `${this.apigeeBaseUrl}/environments/${environment}/apis/${apiName}/revisions/1/deployments`;
        await axios.post(url, {}, { headers });
    }
}
