declare module 'loaderio' {
    type LoaderIOTestCreateData = {
        name: string;
        test_type?: string;
        urls: Url[];
        duration: number;
        initial?: number;
        total?: number;
        timeout?: number;
        error_threshold?: number;
        callback?: string;
        callback_email?: string;
        scheduled_at?: Date;
        notes?: string;
    };

    class Client {
        constructor(token: string, server?: string, version?: string);

        static METHOD: {
            GET: 'GET';
            POST: 'POST';
            PATCH: 'PATCH';
            PUT: 'PUT';
            DELETE: 'DELETE';
        };

        request(
            path: string,
            method: string,
            options?: Partial<{
                parameters: object;
                body: any;
            }>,
        ): Promise<any>;
    }

    class Url {
        static TYPE: {
            GET: 'GET';
            POST: 'POST';
            PATCH: 'PATCH';
            PUT: 'PUT';
            DELETE: 'DELETE';
        };

        constructor(info: {
            url: string;
            truncated_url?: string;
            raw_post_body?: string;
            request_type?: string;
            payload_file_url?: string;
            headers?: object;
            request_params?: object;
            variables?: Variable[];
            authentication?: object;
        });

        toJSON(): {
            url: string;
            truncated_url?: string;
            raw_post_body?: string;
            request_type: string;
            payload_file_url?: string;
            headers: object;
            request_params?: object;
            variables?: any[];
            authentication?: {
                password: string;
                type: string;
                login: string;
            };
        };
    }

    class Variable {
        constructor(info: { name: string; property: string; source: string });

        toJSON(): { name: string; property: string; source: string };
    }

    class Endpoint {
        constructor(client: Client);
    }

    class Application extends Endpoint {
        static STATUS: {
            VERIFIED: 'VERIFIED';
            UNVERIFIED: 'UNVERIFIED';
        };

        constructor(
            client: Client,
            info: {
                app: string;
                app_id: string;
                status: string;
            },
        );

        delete(): Promise<boolean>;

        verify(): Promise<boolean>;
    }

    class Test extends Endpoint {
        static STATUS: {
            PENDING: 'pending';
            RUNNING: 'running';
            COMPLETE: 'complete';
        };

        static TYPE: {
            CLIENTS_PER_TEST: 'per-test';
            CLIENTS_PER_SECOND: 'per-second';
            MAINTAIN_CLIENT_LOAD: 'maintain-load';
        };

        results: LoaderIO.Results;

        constructor(
            client: Client,
            info: {
                test_id: string;
                name: string;
                domain: string;
                status: string;
                test_type: string;
                urls: Url[];
                duration: number;
                initial: number;
                total: number;
                timeout: number;
                errorThreshold: number;
                callback: string;
                callback_email: string;
                scheduled_at: string | Date;
                notes: string;
            },
        );

        run(): Promise<boolean>;

        stop(): Promise<boolean>;

        toJSON(): {
            notes: string;
            initial: number;
            scheduled_at: string;
            timeout: number;
            test_type: string;
            duration: number;
            total: number;
            callback_email: string;
            urls: any[];
            domain: string;
            name: string;
            callback: string;
            status: string;
            test_id: string;
        };
    }

    class Result extends Endpoint {
        static STATUS: {
            READY: 'ready';
            NOT_READY: 'not_ready';
        };

        constructor(info: {
            result_id: string;
            started_at: string | Date;
            status: string;
            public_results_url: string;
            success: number;
            error: number;
            timeout_error: number;
            network_error: number;
            data_sent: number;
            data_received: number;
            avg_response_time: number;
            avg_error_rate: number;
        });
    }

    namespace LoaderIO {
        export default class LoaderIOClass {
            constructor(
                options?: Partial<{
                    token: string;
                    server: string;
                    version: string;
                }>,
            );

            applications: Applications;
            tests: Tests;
            servers: Servers;
        }

        export class Applications extends Endpoint {
            create(app: string): Promise<Application>;

            get(id: string): Promise<Application>;

            list(): Promise<Application[]>;
        }

        export class Tests extends Endpoint {
            create(data: LoaderIOTestCreateData): Promise<Test>;

            get(id: string): Promise<Test>;

            list(): Promise<Test[]>;
        }

        export class Results extends Endpoint {
            constructor(client: Client, testId: string);

            get(id: string): Promise<Result>;

            list(): Promise<Result[]>;
        }

        export class Servers extends Endpoint {
            list(): Promise<string[]>;
        }
    }

    export = LoaderIO;
}
