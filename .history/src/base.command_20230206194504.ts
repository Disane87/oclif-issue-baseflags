import { Command, Flags, Interfaces } from '@oclif/core';

export enum LogLevel {
    trace = 'trace',
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error'
}


export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['baseFlags'] & T['flags']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
    static enableJsonFlag = true


    static baseFlags = {
        logLevel: Flags.enum<LogLevel>({
            summary: 'Specify level for logging.',
            options: Object.values(LogLevel),
            default: LogLevel.info
        }),

        debug: Flags.boolean({ char: 'd', default: true }),
        logPath: Flags.string({ char: 'l', description: 'Log path', default: './logs/' })

    }

    protected flags!: Flags<T>;

    public async init(): Promise<void> {
        await super.init()
        const { flags } = await this.parse({
            flags: this.ctor.flags,

            baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
            args: this.ctor.args,
            strict: this.ctor.strict,
        })
        this.flags = flags as Flags<T>


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