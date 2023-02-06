import { Command, Flags, Interfaces } from '@oclif/core';

export enum LogLevel {
    trace = `trace`,
    debug = `debug`,
    info = `info`,
    warn = `warn`,
    error = `error`
}


export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['baseFlags'] & T['flags']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
    // add the --json flag
    static enableJsonFlag = true

    protected logger: winston.Logger = null;

    //define flags that can be inherited by any command that extends BaseCommand
    static baseFlags = {
        logLevel: Flags.enum<LogLevel>({
            summary: 'Specify level for logging.',
            options: Object.values(LogLevel),
            default: LogLevel.info
        }),

        debug: Flags.boolean({ char: `d`, default: true }),
        logPath: Flags.string({ char: `l`, description: `Log path`, default: './logs/' })

    }

    protected flags!: Flags<T>;

    public async init(): Promise<void> {
        await super.init()
        const { args, flags } = await this.parse({
            flags: this.ctor.flags,
            // base
            // baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
            args: this.ctor.args,
            strict: this.ctor.strict,
        })
        this.flags = flags as Flags<T>

        this.logger = createLogger(this.flags?.logLevel || LogLevel.info, this.flags?.logPath || './logs/');

        this.logger.info(`Got flags for plugin ${this.id} -> ${JSON.stringify(flags, null, 4)}`);
    }

    protected async catch(err: Error & { exitCode?: number }): Promise<any> {
        // add any custom logic to handle errors from the command
        // or simply return the parent class error handling
        return super.catch(err)
    }

    protected async finally(_: Error | undefined): Promise<any> {
        // called after run and catch regardless of whether or not the command errored
        return super.finally(_)
    }
}